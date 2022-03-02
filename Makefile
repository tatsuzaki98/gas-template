##########################################################################
# Initialize
#
${shell mkdir -p target/dev target/dist}


##########################################################################
# Aliases
#
.PHONY: all
all: dist dev

.PHONY: dist
dist: \
  target/dist/main.js \
  target/dist/appsscript.json \
  target/dist/index.html \
  target/dist/style.html

.PHONY: dev
dev: target/dev/index.css target/dev/index.html

.PHONY: serve
serve: dev
	cd target/dev && php -S localhost:8888

.PHONY: clear
clear:
	rm -r target


##########################################################################
# Dependencies
#
target/dist/main.js: src/main.ts tsconfig.json
target/dist/appsscript.json: src/appsscript.json
target/dist/index.html: src/index.html assets/parse_html.py
target/dist/style.html: target/dev/index.css

target/dev/index.html: src/index.html assets/parse_html.py
target/dev/index.css: \
  src/index.html\
  assets/postcss.config.js\
  assets/tailwind.pcss\
  assets/tailwind.config.js

##########################################################################
# Recipes
#
target/dist/main.js:
	npx tsc

target/dist/appsscript.json:
	install src/appsscript.json $@

target/dist/index.html:
	./assets/parse_html.py -i src/index.html -t dist > $@

target/dist/style.html:
	printf "<style>\n" > $@
	cat target/dev/index.css >> $@
	printf "\n</style>\n" >> $@

target/dev/index.css:
	touch $@
	npx postcss --config assets/postcss.config.js assets/tailwind.pcss -o $@

target/dev/index.html:
	./assets/parse_html.py -i src/index.html -t dev > $@
