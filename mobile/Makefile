.PHONY: android ios

install:
	@echo "\x1b[1m[Mobile] 🔥 Installing packages... \x1b[0m";
	@if [ -d node_modules ]; then echo "\x1b[1m\x1b[33m[Mobile] Packages is already installed. \x1b[0m"; \
	else yarn; \
	fi; \
	if [ -d ./ios/Pods ]; then echo "\x1b[1m\x1b[33m[Mobile] Pods is already installed. \x1b[0m"; exit 0; \
	else pod install; \
	fi; \

start: install
	@echo "\x1b[1m[Mobile] 🔥 Starting packager... \x1b[0m";
	@yarn start;

link: install
	@echo "\x1b[1m[Mobile] 🔥 Linking librairies... \x1b[0m";
	@react-native link;

ios:
	@echo "\x1b[1m[Mobile] 🔥 Launching iOS application... \x1b[0m";
	@react-native run-ios

android:
	@echo "\x1b[1m[Mobile] 🔥 Launching Android application... \x1b[0m";
	@react-native run-android

open-ios:
	@open ios/Aromaclop.xcodeproj

open-android:
	@open -a /Applications/Android\ Studio.app ./android

reset: 
	@echo "\x1b[1m[Mobile] 🔥 Reset project... \x1b[0m";
	@watchman watch-del-all;
	@rm -rf node_modules;
	@yarn cache clean;