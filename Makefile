OPEN_KRX_SPEC_FILE ?= specifications/openkrx/OpenKrx-public.yml
OPEN_KRX_BUNDLE_FILE ?= docs/OpenKrx-public.yml

OPEN_KIS_SPEC_FILE ?= specifications/openkis/OpenKis-public.yml
OPEN_KIS_BUNDLE_FILE ?= docs/OpenKis-public.yml

OPEN_DART_SPEC_FILE ?= specifications/opendart/OpenDart-public.yml
OPEN_DART_BUNDLE_FILE ?= docs/OpenDart-public.yml

.PHONY: dev-dependencies
dev-dependencies:
	npm install

.PHONY: openkrx-bundle
openkrx-bundle: dev-dependencies
	npm run bundle -- ${OPEN_KRX_SPEC_FILE} -o ${OPEN_KRX_BUNDLE_FILE}

.PHONY: openkis-bundle
openkis-bundle: dev-dependencies
	npm run bundle -- ${OPEN_KIS_SPEC_FILE} -o ${OPEN_KIS_BUNDLE_FILE}

.PHONY: opendart-bundle
opendart-bundle: dev-dependencies
	npm run bundle -- ${OPEN_DART_SPEC_FILE} -o ${OPEN_DART_BUNDLE_FILE}

.PHONY: bundle
bundle: openkrx-bundle openkis-bundle opendart-bundle
	@echo "Bundling OpenKRX and OpenKIS and OpenDart specs"

.PHONY: openkrx-lint
openkrx-lint: openkrx-bundle
	@npm run lint -- --skip-rule=operation-4xx-response ${OPEN_KRX_BUNDLE_FILE}

.PHONY: openkis-lint
openkis-lint: openkis-bundle
	@npm run lint -- --skip-rule=operation-4xx-response ${OPEN_KIS_BUNDLE_FILE}

.PHONY: opendart-lint
opendart-lint: opendart-bundle
	@npm run lint -- --skip-rule=operation-4xx-response --skip-rule=security-defined ${OPEN_DART_BUNDLE_FILE}
	
#.PHONY: lint
#lint: bundle
## remove skip-rule option when all rules are added 400 response code
# @npm run lint -- --skip-rule=operation-4xx-response ${OPEN_KIS_SPEC_FILE} ${OPEN_KRX_SPEC_FILE} ${OPEN_DART_SPEC_FILE}

.PHONY: preview
preview: dev-dependencies
	SPEC_FILE=${SPEC_FILE} npm run preview
