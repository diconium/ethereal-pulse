output "resource_group_name" {
  value = azurerm_resource_group.example.name
}

output "container_registry_name" {
  value = azurerm_container_registry.example.name
}

output "container_app_name" {
  value = azurerm_container_app.example.name
}
