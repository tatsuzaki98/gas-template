##########################################################################
# Recipes
#
.PHONY: css
css: src/style.html


##########################################################################
# Recipes
#
dist/tailwind.css: assets/postcss.config.js assets/tailwind.pcss src/index.html 
	npx postcss --config assets/postcss.config.js ./assets/tailwind.pcss -o $@

src/style.html: dist/tailwind.css
	printf "<style>\n" > $@
	cat $< >> $@
	printf "\n</style>\n" >> $@


##########################################################################
# Dependencies
#
assets/postcss.config.js: assets/tailwind.config.js
