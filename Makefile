OPEN_KRX_SPEC_FILE ?= specifications/openkrx/OpenKrx-public.v1.yml
OPEN_KRX_BUNDLE_FILE ?= tests/OpenKrx-public.v1.yml

.PHONY: dev-dependencies
dev-dependencies:
	npm install

.PHONY: openkrx-bundle
openkrx-bundle: dev-dependencies
	npm run bundle -- ${OPEN_KRX_SPEC_FILE} -o ${OPEN_KRX_BUNDLE_FILE}
