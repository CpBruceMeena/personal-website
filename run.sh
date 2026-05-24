#!/bin/bash

# --- Colors ---
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

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
    echo -e "${YELLOW}Installing Node.js...${NC}"
    
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
                echo -e "${RED}Unsupported Linux distribution. Please install Node.js manually.${NC}"
                exit 1
            fi
            ;;
        "windows")
            echo -e "${RED}Please install Node.js from https://nodejs.org/${NC}"
            exit 1
            ;;
        *)
            echo -e "${RED}Unsupported operating system. Please install Node.js manually.${NC}"
            exit 1
            ;;
    esac
}

# Function to verify Node.js installation
verify_node() {
    if ! command -v node &> /dev/null; then
        echo -e "${YELLOW}Node.js is not installed.${NC}"
        local os=$(detect_os)
        install_node $os
    fi
    
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}npm is not installed. Please install Node.js properly.${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}Node.js version: $(node --version)${NC}"
    echo -e "${GREEN}npm version: $(npm --version)${NC}"
}

# Function to kill existing processes on ports 4000 and 4001
cleanup_ports() {
    echo -e "${YELLOW}Cleaning up existing processes on ports 4000 and 4001...${NC}"
    for port in 4000 4001; do
        pid=$(lsof -ti :$port)
        if [ -n "$pid" ]; then
            echo "Killing process $pid on port $port"
            kill -9 $pid 2>/dev/null
        fi
    done
}

# Cleanup function to kill background processes on exit
cleanup_on_exit() {
    echo -e "\n${YELLOW}Shutting down servers...${NC}"
    kill $BACKEND_PID 2>/dev/null
    exit
}

# Main script execution
echo -e "${GREEN}Digital Universe Setup & Launch${NC}"
echo "Detecting operating system..."
OS=$(detect_os)
echo "Operating system: $OS"

# Verify Node.js
verify_node

# Port cleanup
cleanup_ports

# Install dependencies
echo -e "${YELLOW}Installing project dependencies...${NC}"
npm install

# Set trap for cleanup
trap cleanup_on_exit SIGINT SIGTERM

# Start Backend Server
echo -e "${GREEN}Starting Backend Server (port 4001)...${NC}"
node server.js &
BACKEND_PID=$!

# Wait for backend to be ready
sleep 2

# Start Frontend
echo -e "${GREEN}Starting Frontend Galaxy (port 4000)...${NC}"
if [ "$NODE_ENV" = "production" ]; then
    npm run build
    npm run preview
else
    npm run dev
fi
