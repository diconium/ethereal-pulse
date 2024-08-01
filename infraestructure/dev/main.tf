provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "example" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_container_registry" "example" {
  name                = var.container_registry_name
  resource_group_name = azurerm_resource_group.example.name
  location            = azurerm_resource_group.example.location
  sku                 = "Basic"
  admin_enabled       = true
}

resource "azurerm_container_app_environment" "example" {
  name                = "example-environment"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name
}

resource "azurerm_container_app" "example" {
  name                        = var.container_app_name
  container_app_environment_id = azurerm_container_app_environment.example.id
  resource_group_name         = azurerm_resource_group.example.name
  location                    = azurerm_resource_group.example.location

  template {
    container {
      name   = "example-container"
      image  = "${azurerm_container_registry.example.login_server}/ethereal-pulse:latest"
      resources {
        cpu    = "0.5"
        memory = "1.5Gi"
      }

      env {
        name  = "DATABASE_URI"
        value = var.database_uri
      }

      env {
        name  = "AZURE_CONNECTION_STRING"
        value = var.azure_connection_string
      }

      # Add other environment variables here
    }

    scale {
      min_replicas = 1
      max_replicas = 3
    }
  }

  tags = {
    environment = "testing"
  }
}
