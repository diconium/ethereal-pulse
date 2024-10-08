provider "azurerm" {
  features {}
}

module "database" {
  source = "./database"
  cosmosdb_account_name = var.cosmosdb_account_name
  location              = var.location
  resource_group_name   = var.resource_group_name
  cosmosdb_offer_type   = var.cosmosdb_offer_type
  cosmosdb_kind         = var.cosmosdb_kind
  cosmosdb_throughput   = var.cosmosdb_throughput
}

resource "azurerm_resource_group" "ethereal_pulse_resource_group" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_container_registry" "ethereal_pulse_container_registry" {
  name                = var.container_registry_name
  resource_group_name = var.resource_group_name
  location            = var.location
  sku                 = "Basic"
  admin_enabled       = true
}

resource "azurerm_container_app_environment" "ethereal_pulse_environment" {
  name                = "ethereal-pulse-environment"
  location            = var.location
  resource_group_name = var.resource_group_name
}

resource "azurerm_container_app" "ethereal_pulse_server_app" {
  name                        = var.container_app_name
  container_app_environment_id = azurerm_container_app_environment.ethereal_pulse_environment.id
  resource_group_name         = var.resource_group_name
  revision_mode               = "Single"

  template {
    container {
      name   = "server-container"
      image  = "${azurerm_container_registry.ethereal_pulse_container_registry.login_server}/ethereal-pulse:latest"
      cpu    = "0.5"
      memory = "1.5Gi"

      env {
        name  = "DATABASE_URI"
        value = var.database_uri
      }

      env {
        name  = "AZURE_CONNECTION_STRING"
        value = var.azure_connection_string
      }

    }
  }

  tags = {
    environment = "testing"
  }
}

resource "azurerm_container_app" "ethereal_pulse_client_app" {
  name                        = var.client_app_name
  container_app_environment_id = azurerm_container_app_environment.ethereal_pulse_environment.id
  resource_group_name         = var.resource_group_name
  revision_mode               = "Single"

  template {
    container {
      name   = "client-container"
      image  = "${azurerm_container_registry.ethereal_pulse_container_registry.login_server}/client:latest"
      cpu    = "0.5"
      memory = "1.5Gi"

      env {
        name  = "GITHUB_CLIENT_ID"
        value = var.github_client_id
      }

      env {
        name  = "GITHUB_CLIENT_SECRET"
        value = var.github_client_secret
      }

      env {
        name  = "GITHUB_CALLBACK_URL"
        value = var.github_callback_url
      }
    }
  }

  tags = {
    environment = "testing"
  }
}
