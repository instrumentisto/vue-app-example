
VERSION ?= 1.0.0

IMAGE_NAME := instrumentisto/vue-app-example

NODE_VERSION := latest
NODE_ALPINE_VERSION := alpine
SELENIUM_CHROME_VERSION := latest
SELENIUM_FIREFOX_VERSION := latest

DIST_DIR := _dist

MAINLINE_BRANCH := dev
CURRENT_BRANCH := $(shell git branch | grep \* | cut -d ' ' -f2)


cmd ?= !default
dev ?= yes
no-cache ?= no


comma := ,
empty :=
space := $(empty) $(empty)
eq = $(if $(or $(1),$(2)),$(and $(findstring $(1),$(2)),\
                                $(findstring $(2),$(1))),1)



# Build project from sources.
#
# Usage:
#	make build [dev=(yes|no)] [target=(all|client|server)]

env ?= $(if $(call eq,$(dev),yes),development,production)
target ?= all

build:
	docker run --rm -v $(PWD):/app -w /app -e NODE_ENV=$(env) \
		node:$(NODE_ALPINE_VERSION) \
			yarn build:$(target)



# Resolve all project dependencies.
#
# Usage:
#	make deps [dev=(yes|no)]

deps: deps.yarn deps.docker
ifeq ($(wildcard $(DIST_DIR)),)
	mkdir -p $(DIST_DIR)
endif



# Resolve project dependencies with Yarn.
#
# Optional 'cmd' parameter may be used for handy usage of docker-wrapped Yarn,
# for example: `make deps.yarn cmd="update"`.
#
# Usage:
#	make deps.yarn [cmd=] [dev=(yes|no)]

yarn-args = $(if $(call eq,$(cmd),!default),install,$(cmd))
yarn-args-full = $(yarn-args) \
                 $(if $(and $(call eq,$(dev),no),\
                            $(call eq,$(yarn-args),install)),\
                   --production,)

deps.yarn:
	docker run --rm -v $(PWD):/app -w /app \
		-e YARN_CACHE_FOLDER=/app/_cache/yarn \
		node:$(NODE_ALPINE_VERSION) \
			yarn $(yarn-args-full)



# Resolve project Docker dependencies.
#
# Usage:
#	make deps.docker

deps.docker:
	docker pull node:$(NODE_VERSION)
	docker pull node:$(NODE_ALPINE_VERSION)
	docker pull selenium/standalone-chrome:$(SELENIUM_CHROME_VERSION)
	docker pull selenium/standalone-firefox:$(SELENIUM_FIREFOX_VERSION)



# Lint project TypeScript sources with TSLint.
#
# Usage:
#	make lint

lint:
	docker run --rm -v $(PWD):/app -w /app \
		node:$(NODE_ALPINE_VERSION) \
			yarn lint



# Run all project tests.
#
# Usage:
#	make test

test: test.unit test.e2e test.docker



# Run unit tests for project with Karma.
#
# Usage:
#	make test.unit [watch=(no|yes)]

unit-watch-prefix = $(if $(call eq,$(watch),yes),watch:,)

test.unit:
	docker run --rm -v $(PWD):/app -w /app node:$(NODE_VERSION) \
		yarn $(unit-watch-prefix)test:unit



# Run Nightwatch.js E2E tests for project.
#
# Usage:
#	make test.e2e [start-app=(no|yes)]
#	              [browsers=chrome,firefox]
#	              [watch=(no|yes)]

start-app ?= no
browsers ?= chrome,firefox
selenium-chrome-port := 4444
selenium-firefox-port := 4445
e2e-watch-prefix = $(if $(call eq,$(watch),yes),watch:,)

test.e2e:
ifeq ($(start-app),yes)
	-@docker-compose down
	docker-compose up -d
endif
	$(foreach browser,$(subst $(comma), ,$(browsers)), \
		$(call checkSeleniumStarted,$(browser)))
	$(foreach browser,$(subst $(comma), ,$(browsers)), \
		$(if $(call eq,$(run-selenium-$(browser)),yes), \
			$(call startSelenium,$(browser)),))
	docker run --rm --net=host -v $(PWD):/app -w /app \
	           -e NOT_START_SELENIUM=1 \
	           -e E2E_BROWSERS=$(browsers) \
		node:$(NODE_ALPINE_VERSION) \
			yarn $(e2e-watch-prefix)test:e2e
	$(foreach browser,$(subst $(comma), ,$(browsers)), \
		$(if $(call eq,$(run-selenium-$(browser)),yes), \
			$(call stopSelenium,$(browser)),))
ifeq ($(start-app),yes)
	docker-compose down
endif
define checkSeleniumStarted
	$(eval run-selenium-$(1) := \
		$(if $(call eq,$(shell docker ps -q -f name=selenium-$(1)),),yes,))
endef
define startSelenium
	$()
	-@docker stop selenium-$(1)
	-@docker rm selenium-$(1)
	docker run -d --name=selenium-$(1) -p $(selenium-$(1)-port):4444 \
	           --net=vueappexample_default \
	           --link=vue-app-example-nginx:vue-app-example.dev \
			   --link=vue-app-example-json-server:api.vue-app-example.dev \
	           -e DBUS_SESSION_BUS_ADDRESS=/dev/null \
		selenium/standalone-$(1):$(SELENIUM_$(shell echo $(1) | tr a-z A-Z)_VERSION)
	$(eval selenium-$(1)-started := yes)
endef
define stopSelenium
	$()
	docker stop selenium-$(1)
	docker rm selenium-$(1)
endef



# Run Bats tests for project Docker image.
#
# Usage:
#	make test.docker [VERSION=]

test.docker:
	IMAGE=$(IMAGE_NAME):$(VERSION) node_modules/.bin/bats test/docker/suite.bats



# Generate Typedoc documentation of project TypeScript sources.
#
# Documentation of Typedoc tools:
#	http://typedoc.org/guides/usage/
#
# Usage:
#	make docs

docs:
	docker run --rm -v $(PWD):/app -w /app node:$(NODE_ALPINE_VERSION) \
		yarn docs



# Build project Docker image.
#
# Usage:
#	make docker.image [no-cache=(yes|no)] [VERSION=]

no-cache-arg = $(if $(call eq,$(no-cache),yes),--no-cache,)

docker.image:
	docker build $(no-cache-arg) -t $(IMAGE_NAME):$(VERSION) .



# Create distribution files of project.
#
# Usage:
#	make dist

dist:
	mkdir -p $(DIST_DIR)
	rm -rf $(DIST_DIR)/*
	cp -r node_modules public index.server.html server.js vue-ssr-bundle.json \
		$(DIST_DIR)/



# Squash changes of the current Git branch onto another Git branch.
#
# WARNING: You must merge `onto` branch in the current branch before squash!
#
# Usage:
#	make squash [onto=] [del=(no|yes)]

onto ?= $(MAINLINE_BRANCH)
del ?= no
upstream ?= origin

squash:
ifeq ($(CURRENT_BRANCH),$(onto))
	@echo "--> Current branch is '$(onto)' already" && false
endif
	git checkout $(onto)
	git branch -m $(CURRENT_BRANCH) orig-$(CURRENT_BRANCH)
	git checkout -b $(CURRENT_BRANCH)
	git branch --set-upstream-to $(upstream)/$(CURRENT_BRANCH)
	git merge --squash orig-$(CURRENT_BRANCH)
ifeq ($(del),yes)
	git branch -d orig-$(CURRENT_BRANCH)
endif



# Clean all project files that is not under version control.
#
# WARNING: This will remove all your local untracked and ignored files!
#
# Usage:
#	make clean

clean:
	git clean -ffdx



.PHONY: build lint docs \
        deps deps.yarn deps.docker \
        test test.unit test.e2e test.docker \
        docker.image dist squash clean
