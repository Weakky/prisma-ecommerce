install:
	@echo "\x1b[1m[Back-office] 🔥 Installing packages... \x1b[0m";
	@if [ -d node_modules ]; then echo "\x1b[1m\x1b[33m[Back-Office] Packages is already installed. \x1b[0m"; exit 0; \
	else yarn; \
	fi; \

start: install
	@echo "\x1b[1m[Back-office] 🔥 Starting packager... \x1b[0m";
	@yarn start;

reset: 
	@echo "\x1b[1m[Back-office] 🔥 Reset project... \x1b[0m";
	@watchman watch-del-all;
	@rm -rf node_modules;
	@yarn cache clean;