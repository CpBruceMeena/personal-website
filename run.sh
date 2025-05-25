#!/bin/bash

# Function to detect OS
detect_os() {
    case "$(uname -s)" in
        Darwin*)    echo "macos";;
        Linux*)     echo "linux";;
        MINGW*|CYGWIN*|MSYS*) echo "windows";;
        *)          echo "unknown";;
    esac
}

# Function to install Node.js based on OS
install_node() {
    local os=$1
    echo "Installing Node.js..."
    
    case $os in
        "macos")
            if ! command -v brew &> /dev/null; then
                echo "Installing Homebrew..."
                /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
            fi
            brew install node
            ;;
        "linux")
            if command -v apt-get &> /dev/null; then
                curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
                sudo apt-get install -y nodejs
            elif command -v yum &> /dev/null; then
                curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
                sudo yum install -y nodejs
            else
                echo "Unsupported Linux distribution. Please install Node.js manually."
                exit 1
            fi
            ;;
        "windows")
            echo "Please install Node.js from https://nodejs.org/"
            exit 1
            ;;
        *)
            echo "Unsupported operating system. Please install Node.js manually."
            exit 1
            ;;
    esac
}

# Function to verify Node.js installation
verify_node() {
    if ! command -v node &> /dev/null; then
        echo "Node.js is not installed."
        local os=$(detect_os)
        install_node $os
    fi
    
    if ! command -v npm &> /dev/null; then
        echo "npm is not installed. Please install Node.js properly."
        exit 1
    fi
    
    echo "Node.js version: $(node --version)"
    echo "npm version: $(npm --version)"
}

# Main script execution
echo "Detecting operating system..."
OS=$(detect_os)
echo "Operating system: $OS"

# Verify and install Node.js if needed
verify_node

# Install project dependencies
echo "Installing project dependencies..."
npm install

# Start the development server
echo "Starting development server..."
npm start 