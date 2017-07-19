
VERSION ?= 1.0.0

IMAGE_NAME := instrumentisto/vue-app-example

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
	docker run --rm -v $(PWD):/app -w /app -e NODE_ENV=$(env) node:alpine \
		yarn build:$(target)



# Resolve all project dependencies.
#
# Usage:
#	make deps [dev=(yes|no)]

deps: deps.yarn
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
		node:alpine \
			yarn $(yarn-args-full)



# Lint project TypeScript sources with TSLint.
#
# Usage:
#	make lint

lint:
	docker run --rm -v $(PWD):/app -w /app node:alpine \
		yarn lint



# Run all project tests.
#
# Usage:
#	make test

test: test.unit test.e2e test.docker



# Run unit tests for project with Karma.
#
# Usage:
#	make test.unit

test.unit:
	docker run --rm -v $(PWD):/app -w /app node \
		yarn test:unit



# Run Nightwatch.js E2E tests for project.
#
# Usage:
#	make test.e2e [start-app=(no|yes)]

selenium-cont-name := selenium-chrome
start-app ?= no

test.e2e:
ifeq ($(start-app),yes)
	-@docker-compose down
	docker-compose up -d
endif
	-@docker stop $(selenium-cont-name)
	-@docker rm $(selenium-cont-name)
	docker run -d --name=$(selenium-cont-name) --net=host -p 4444:4444 \
		-v /dev/shm:/dev/shm \
		-e DBUS_SESSION_BUS_ADDRESS=/dev/null \
			selenium/standalone-chrome
	docker run --rm --net=host -e NOT_START_SELENIUM=1 -v $(PWD):/app -w /app \
		node:alpine \
			yarn test:e2e
	docker stop $(selenium-cont-name)
	docker rm $(selenium-cont-name)
ifeq ($(start-app),yes)
	docker-compose down
endif



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
	docker run --rm -v $(PWD):/app -w /app node:alpine \
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
        deps deps.yarn \
        test test.unit test.e2e test.docker \
        docker.image dist squash clean
