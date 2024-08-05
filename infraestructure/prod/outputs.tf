output "resource_group_name" {
  value = var.resource_group_name
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
