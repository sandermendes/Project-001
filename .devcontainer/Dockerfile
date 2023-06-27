FROM mcr.microsoft.com/devcontainers/go:0-1.20-bullseye

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

# [Optional] Uncomment the next lines to use go get to install anything else you need
USER vscode
# USER root

# Enforce SSH Url
RUN git config --global --add url."git@github.com:".insteadOf "https://github.com/"

# Protoc Compiler
RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@latest \
    && go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

# Protoc
RUN sudo apt install unzip \
    && cd /tmp \
    && wget -O protobuf.zip https://github.com/protocolbuffers/protobuf/releases/download/v23.0/protoc-23.0-linux-x86_64.zip \
    && unzip protobuf.zip -d protobuf \
    && sudo mv protobuf /lib \
    && sudo ln -s /lib/protobuf/bin/protoc /usr/local/bin/protoc
# USER root

# Install OpenSSL to generate certificates
RUN sudo apt -y install openssl

# Install OpenSSL to generate certificates
RUN sudo nvm install --lts

# [Optional] Uncomment this line to install global node packages.
# RUN su vscode -c "source /usr/local/share/nvm/nvm.sh && npm install -g <your-package-here>" 2>&1
