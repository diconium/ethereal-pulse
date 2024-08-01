variable "resource_group_name" {
  description = "The name of the resource group"
  type        = string
  default     = "example-resources-dev"
}

variable "location" {
  description = "The Azure region to deploy resources"
  type        = string
  default     = "West Europe"
}

variable "container_registry_name" {
  description = "The name of the Azure Container Registry"
  type        = string
  default     = "exampleRegistryDev"
}

variable "container_app_name" {
  description = "The name of the Azure Container App"
  type        = string
  default     = "example-container-app-dev"
}

variable "database_uri" {
  description = "The URI of the database"
  type        = string
}

variable "azure_connection_string" {
  description = "The connection string for Azure"
  type        = string
}
