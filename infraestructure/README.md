# Ethereal Pulse Infrastructure Setup Guide

This guide will walk you through the steps needed to install the Azure CLI and Terraform on your machine (macOS, Linux, or Windows) and run the Terraform scripts for the Ethereal Pulse project.

## Table of Contents

- [Ethereal Pulse Infrastructure Setup Guide](#ethereal-pulse-infrastructure-setup-guide)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Install Azure CLI](#install-azure-cli)
    - [macOS](#macos)
    - [Linux](#linux)
    - [Windows](#windows)
  - [Install Terraform](#install-terraform)
    - [macOS](#macos-1)
    - [Linux](#linux-1)
    - [Windows](#windows-1)
  - [Authenticate Azure CLI](#authenticate-azure-cli)
  - [Initialize Terraform](#initialize-terraform)
  - [Plan and Apply Terraform Configuration](#plan-and-apply-terraform-configuration)
    - [Plan](#plan)
    - [Apply](#apply)
  - [Directory Structure](#directory-structure)
  - [Variables](#variables)
  - [Outputs](#outputs)
  - [Example `terraform.tfvars` File](#example-terraformtfvars-file)
  - [Clean Up](#clean-up)
  - [Additional Resources](#additional-resources)

## Prerequisites

- An Azure account
- A Terraform Cloud account (optional, for remote state management)

## Install Azure CLI

### macOS

Install the Azure CLI using Homebrew:

```sh
brew update && brew install azure-cli
```

### Linux

Install the Azure CLI using a script:

```sh
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

### Windows

1. Download the Azure CLI MSI installer from the [Azure CLI page](https://aka.ms/installazurecliwindows).
2. Run the installer and follow the instructions.

## Install Terraform

### macOS

Install Terraform using Homebrew:

```sh
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
```

### Linux

Install Terraform using apt-get:

```sh
sudo apt-get update && sudo apt-get install -y gnupg software-properties-common
wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt-get update && sudo apt-get install terraform
```

### Windows

1. Download the Terraform binary from the [Terraform downloads page](https://www.terraform.io/downloads.html).
2. Extract the binary and add its directory to your PATH.

## Authenticate Azure CLI

To authenticate the Azure CLI, run:

```sh
az login
```

Follow the instructions in the browser to complete the authentication process.

## Initialize Terraform

Navigate to the appropriate directory (development or production) and initialize Terraform:

```sh
cd ethereal-pulse/infrastructure/dev  # or prod
terraform init
```

## Plan and Apply Terraform Configuration

### Plan

To generate and review an execution plan, run:

```sh
terraform plan
```

### Apply

To apply the changes required to reach the desired state of the configuration, run:

```sh
terraform apply
```

## Directory Structure

- `ethereal-pulse/infrastructure/dev`: Development environment Terraform scripts
- `ethereal-pulse/infrastructure/prod`: Production environment Terraform scripts

## Variables

Variables for the Terraform scripts are defined in the `variables.tf` files in the respective environment directories. You can override these variables by creating a `terraform.tfvars` file in the same directory.

## Outputs

Outputs from the Terraform scripts are defined in the `outputs.tf` files in the respective environment directories. These outputs provide useful information such as resource names and connection strings.

## Example `terraform.tfvars` File

Below is an example of a `terraform.tfvars` file for the development environment:

```hcl
resource_group_name = "ethereal-pulse-resources-dev"
location = "West Europe"
container_registry_name = "ethereal-pulse-registry-dev"
container_app_name = "ethereal-pulse-server-app-dev"
database_uri = "your-database-uri"
azure_connection_string = "your-azure-connection-string"
client_app_name = "ethereal-pulse-client-app-dev"
github_client_id = "your-github-client-id"
github_client_secret = "your-github-client-secret"
github_callback_url = "your-github-callback-url"
cosmosdb_account_name = "example-cosmosdb-account-dev"
mongo_database_name = "example-mongo-database-dev"
cosmosdb_offer_type = "Standard"
cosmosdb_kind = "MongoDB"
cosmosdb_throughput = 400
```

## Clean Up

To destroy the resources created by Terraform, navigate to the appropriate directory and run:

```sh
terraform destroy
```

## Additional Resources

- [Terraform Documentation](https://www.terraform.io/docs/index.html)
- [Azure CLI Documentation](https://docs.microsoft.com/en-us/cli/azure/)

By following these steps, you'll be able to successfully set up and manage your Azure infrastructure using Terraform. Happy coding!
