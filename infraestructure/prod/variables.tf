variable "resource_group_name" {
  description = "The name of the resource group"
  type        = string
  default     = "ethereal-pulse-resources-prod"
}

variable "location" {
  description = "The Azure region to deploy resources"
  type        = string
  default     = "West Europe"
}

variable "container_registry_name" {
  description = "The name of the Azure Container Registry"
  type        = string
  default     = "ethereal-pulse-registry-prod"
}

variable "container_app_name" {
  description = "The name of the Azure Container App"
  type        = string
  default     = "ethereal-pulse-server-app-prod"
}

variable "database_uri" {
  description = "The URI of the database"
  type        = string
}

variable "azure_connection_string" {
  description = "The connection string for Azure"
  type        = string
}

variable "client_app_name" {
  description = "The name of the client Azure Container App"
  type        = string
  default     = "ethereal-pulse-client-app-prod"
}

variable "github_client_id" {
  description = "The GitHub client ID"
  type        = string
}

variable "github_client_secret" {
  description = "The GitHub client secret"
  type        = string
}

variable "github_callback_url" {
  description = "The GitHub callback URL"
  type        = string
}
