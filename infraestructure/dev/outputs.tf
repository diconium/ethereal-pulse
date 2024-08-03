output "resource_group_name" {
  value = azurerm_resource_group.ethereal_pulse_resource_group.name
}

output "container_registry_name" {
  value = azurerm_container_registry.ethereal_pulse_container_registry.name
}

output "container_app_name" {
  value = azurerm_container_app.ethereal_pulse_server_app.name
}

output "client_app_name" {
  value = azurerm_container_app.ethereal_pulse_client_app.name
}
