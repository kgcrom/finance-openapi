OPEN_KRX_SPEC_FILE ?= specifications/openkrx/OpenKrx-public.yml
OPEN_KRX_BUNDLE_FILE ?= docs/OpenKrx-public.yml

.PHONY: dev-dependencies
dev-dependencies:
	npm install

.PHONY: openkrx-bundle
openkrx-bundle: dev-dependencies
	npm run bundle -- ${OPEN_KRX_SPEC_FILE} -o ${OPEN_KRX_BUNDLE_FILE}

.PHONY: preview
preview: dev-dependencies
	SPEC_FILE=${SPEC_FILE} npm run preview
