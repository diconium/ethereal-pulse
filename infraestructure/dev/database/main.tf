provider "azurerm" {
  features {}
}

resource "azurerm_cosmosdb_account" "example" {
  name                = var.cosmosdb_account_name
  location            = var.location
  resource_group_name = var.resource_group_name
  offer_type          = var.cosmosdb_offer_type
  kind                = var.cosmosdb_kind
  enable_automatic_failover = true

  consistency_policy {
    consistency_level = "Session"
  }

  geo_location {
    location          = var.location
    failover_priority = 0
  }
}

resource "azurerm_cosmosdb_mongo_database" "example" {
  name                = var.mongo_database_name
  resource_group_name = var.resource_group_name
  account_name        = azurerm_cosmosdb_account.example.name
}

resource "azurerm_cosmosdb_mongo_collection" "api_keys" {
  name                = "api_keys"
  resource_group_name = var.resource_group_name
  account_name        = azurerm_cosmosdb_account.example.name
  database_name       = var.mongo_database_name
  throughput          = var.cosmosdb_throughput

  mongo_index {
    keys   = ["name", "userId"]
    unique = true
  }
}

resource "azurerm_cosmosdb_mongo_collection" "integrations" {
  name                = "integrations"
  resource_group_name = var.resource_group_name
  account_name        = azurerm_cosmosdb_account.example.name
  database_name       = var.mongo_database_name
  throughput          = var.cosmosdb_throughput
}

resource "azurerm_cosmosdb_mongo_collection" "users" {
  name                = "users"
  resource_group_name = var.resource_group_name
  account_name        = azurerm_cosmosdb_account.example.name
  database_name       = var.mongo_database_name
  throughput          = var.cosmosdb_throughput
}

resource "azurerm_cosmosdb_mongo_collection" "templates" {
  name                = "templates"
  resource_group_name = var.resource_group_name
  account_name        = azurerm_cosmosdb_account.example.name
  database_name       = var.mongo_database_name
  throughput          = var.cosmosdb_throughput
}

resource "azurerm_cosmosdb_mongo_collection" "recipients" {
  name                = "recipients"
  resource_group_name = var.resource_group_name
  account_name        = azurerm_cosmosdb_account.example.name
  database_name       = var.mongo_database_name
  throughput          = var.cosmosdb_throughput
}

resource "azurerm_cosmosdb_mongo_collection" "groups" {
  name                = "groups"
  resource_group_name = var.resource_group_name
  account_name        = azurerm_cosmosdb_account.example.name
  database_name       = var.mongo_database_name
  throughput          = var.cosmosdb_throughput
}

resource "azurerm_cosmosdb_mongo_collection" "emails" {
  name                = "emails"
  resource_group_name = var.resource_group_name
  account_name        = azurerm_cosmosdb_account.example.name
  database_name       = var.mongo_database_name
  throughput          = var.cosmosdb_throughput
}

resource "azurerm_cosmosdb_mongo_collection" "domains" {
  name                = "domains"
  resource_group_name = var.resource_group_name
  account_name        = azurerm_cosmosdb_account.example.name
  database_name       = var.mongo_database_name
  throughput          = var.cosmosdb_throughput
}
