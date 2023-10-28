#!/bin/bash

# Set your ngrok authentication token
authtoken="2XOzDJSZPPLzR0jUidnxnP8yjEo_6XsmGdb6WDLpVJSBvp3yK"

# Get the list of ngrok tunnels using the API
tunnels=$(curl -s -H "Ngrok-Version: 2" -H "Authorization: Bearer $authtoken" https://api.ngrok.com/api/tunnel_sessions)

# Extract the first tunnel ID
tunnel_id=$(echo "$tunnels" | jq -r '.tunnel_sessions[0].id' | awk -F'/' '{print $NF}')

# Stop the first tunnel using the API
curl -X DELETE -H "Authorization: Bearer $authtoken" "https://api.ngrok.com/api/tunnels/$tunnel_id"
