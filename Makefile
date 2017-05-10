
VERSION ?= 1.0.0

IMAGE_NAME := hub.instrumentisto.com/social/frontend
IMAGE_FILE ?= _docker/$(IMAGE_NAME)/$(VERSION).tar


comma := ,
empty :=
space := $(empty) $(empty)
eq = $(if $(or $(1),$(2)),$(and $(findstring $(1),$(2)),\
                                $(findstring $(2),$(1))),1)



# Build project Docker image.
#
# Usage:
#	make docker.image [no-cache=(yes|no)] [VERSION=]

no-cache-arg = $(if $(call eq, $(no-cache), yes), --no-cache, $(empty))

docker.image:
	docker build $(no-cache-arg) -t $(IMAGE_NAME):$(VERSION) .



# Tag project Docker image with given tags.
#
# Usage:
#	make docker.tags [VERSION=] [TAGS=t1,t2,...]

parsed-tags = $(subst $(comma), $(space), $(TAGS))

docker.tags:
	(set -e ; $(foreach tag, $(parsed-tags), \
		docker tag $(IMAGE_NAME):$(VERSION) $(IMAGE_NAME):$(tag) ; \
	))



# Push project Docker images to GitLab Container Registry.
#
# Usage:
#	make docker.push [TAGS=t1,t2,...]

docker.push:
	(set -e ; $(foreach tag, $(parsed-tags), \
		docker push $(IMAGE_NAME):$(tag) ; \
	))



# Pull project Docker images from GitLab Container Registry.
#
# Usage:
#	make docker.pull [TAGS=t1,t2,...]

docker.pull:
	(set -e ; $(foreach tag, $(parsed-tags), \
		docker pull $(IMAGE_NAME):$(tag) ; \
	))



# Save project Docker image to a tar archive.
#
# Usage:
#	make docker.tar [VERSION=] [IMAGE_FILE=]

docker.tar:
ifeq ($(wildcard $(dir $(IMAGE_FILE))),)
	mkdir -p $(dir $(IMAGE_FILE))
endif
	docker save -o $(IMAGE_FILE) $(IMAGE_NAME):$(VERSION)



# Unpack project Docker image from a tar archive.
#
# Usage:
#	make docker.untar [VERSION=] [IMAGE_FILE=]

docker.untar:
	docker load -i $(IMAGE_FILE)



# Runs Bats tests for project Docker image.
#
# Usage:
#	make docker.test [VERSION=]

docker.test:
	IMAGE=$(IMAGE_NAME):$(VERSION) node_modules/.bin/bats test/docker/suite.bats



.PHONY: docker.image docker.tags docker.push docker.pull \
        docker.tar docker.untar docker.test
