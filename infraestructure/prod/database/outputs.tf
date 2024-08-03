output "cosmosdb_account_name" {
  value = azurerm_cosmosdb_account.ethereal_pulse_cosmosdb.name
}

output "mongo_database_name" {
  value = azurerm_cosmosdb_mongo_database.ethereal_pulse_mongo_db.name
}

output "api_keys_collection_name" {
  value = azurerm_cosmosdb_mongo_collection.api_keys.name
}

output "integrations_collection_name" {
  value = azurerm_cosmosdb_mongo_collection.integrations.name
}

output "users_collection_name" {
  value = azurerm_cosmosdb_mongo_collection.users.name
}

output "templates_collection_name" {
  value = azurerm_cosmosdb_mongo_collection.templates.name
}

output "recipients_collection_name" {
  value = azurerm_cosmosdb_mongo_collection.recipients.name
}

output "groups_collection_name" {
  value = azurerm_cosmosdb_mongo_collection.groups.name
}

output "emails_collection_name" {
  value = azurerm_cosmosdb_mongo_collection.emails.name
}

output "domains_collection_name" {
  value = azurerm_cosmosdb_mongo_collection.domains.name
}
