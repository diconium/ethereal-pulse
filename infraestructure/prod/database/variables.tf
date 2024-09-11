variable "cosmosdb_account_name" {
  description = "The name of the Cosmos DB account"
  type        = string
}

variable "mongo_database_name" {
  description = "The name of the MongoDB database"
  type        = string
  default     = "ethereal-pulse-mongo-database-prod"
}

variable "resource_group_name" {
  description = "The name of the resource group"
  type        = string
}

variable "location" {
  description = "The Azure region to deploy resources"
  type        = string
}

variable "cosmosdb_offer_type" {
  description = "The offer type for Cosmos DB"
  type        = string
  default     = "Standard"
}

variable "cosmosdb_kind" {
  description = "The kind of Cosmos DB"
  type        = string
  default     = "MongoDB"
}

variable "cosmosdb_throughput" {
  description = "The throughput for Cosmos DB collections"
  type        = number
  default     = 400
}
