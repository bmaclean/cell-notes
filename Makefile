export

dev:
	clasp push --watch

publish:
	clasp push

cell-notes:
	npm install && export DEVELOPMENT_SCRIPT_ID=$(DEVELOPMENT_SCRIPT_ID) && clasp open $(DEVELOPMENT_SCRIPT_ID)

logs:
	clasp logs --watch
