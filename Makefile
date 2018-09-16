setup: .setup_homebrew .setup_yarn .setup_node .setup_ruby

.setup_homebrew:
	@echo "\x1b[1m[Installing] Homebrew » Package manager... \x1b[0m";
	@if $(homebrew); then \
		echo "\x1b[32m\x1b[1mHomebrew is already installed. \x1b[0m"; \
	else \
		if $(install_homebrew); then \
			echo "done."; exit 0; \
		else \
			echo "failed."; exit 1; \
		fi \
	fi

.setup_yarn: .setup_homebrew
	@echo "";
	@echo "\x1b[1m[Installing] Yarn » Dependency manager... \x1b[0m"; \
	if $(yarn); then \
			echo "\x1b[32m\x1b[1mYarn is already installed. \x1b[0m"; \
		else \
			if $(install_yarn); then \
				echo "Done."; exit 0; \
			else \
				echo "Failed."; exit 1; \
			fi \
		fi

.setup_node: .setup_homebrew .setup_yarn
	@echo "";
	@echo "\x1b[1m[Installing] Node » Javascript engine... \x1b[0m"; \
	if $(node); then \
			echo "\x1b[32m\x1b[1mNode is already installed. \x1b[0m"; \
		else \
			if $(install_node); then \
				echo "done."; exit 0; \
			else \
				echo "failed."; exit 1; \
			fi \
		fi

.setup_ruby: .setup_homebrew .setup_yarn .setup_node
	@echo "";
	@echo "\x1b[1m[Installing] Ruby » Scripting language... \x1b[0m"; \
	if $(ruby); then \
			echo "\x1b[32m\x1b[1mRuby is already installed. \x1b[0m"; \
		else \
			if $(install_ruby); then \
				echo "done."; exit 0; \
			else \
				echo "failed."; exit 1; \
			fi \
		fi

install_homebrew := ruby -e "$$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
install_yarn := brew install yarn
install_node := brew install node
install_ruby := brew install ruby

homebrew := which brew > /dev/null
yarn := which yarn > /dev/null
node := which node > /dev/null
ruby := which ruby > /dev/null