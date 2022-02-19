##########################################################################
# Initialize
#
${shell mkdir -p target dist}


##########################################################################
# Aliases
#
.PHONY: build
build: \
target/main.js \
target/appscript.json \
target/index.html \
target/style.html

.PHONY: css
css: target/style.html

.PHONY: clear
clear:
	rm -r target dist


##########################################################################
# Dependencies
#
assets/postcss.config.js: assets/tailwind.config.js
target/main.js: src/main.ts tsconfig.json
dist/index.css: src/index.html 

##########################################################################
# Recipes
#
target/main.js:
	npx tsc

target/appscript.json: src/appsscript.json
	install $< $@

target/index.html: src/index.html
	install $< $@

target/style.html: dist/index.css
	printf "<style>\n" > $@
	cat $< >> $@
	printf "\n</style>\n" >> $@

dist/index.css: assets/postcss.config.js assets/tailwind.pcss
	npx postcss --config ${word 1, $^} ${word 2, $^} -o $@
