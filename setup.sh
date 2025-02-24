#!/bin/bash
set -e  # Exit immediately if a command exits with a non-zero status

# Define the project directories
folders=("task-backend" "task-frontend")

# Loop through each folder to copy .env.example to .env
for folder in "${folders[@]}"; do
  if [ -f "$folder/.env.example" ]; then
    cp "$folder/.env.example" "$folder/.env"
    echo "Created $folder/.env from $folder/.env.example"
  else
    echo "Error: $folder/.env.example not found!"
    exit 1
  fi
done

# Run npm install in both directories
for folder in "${folders[@]}"; do
  echo "Installing dependencies in $folder..."
  (cd "$folder" && npm install)
done

# Run the setupDatabase.ts script in task-backend
echo "Running setupDatabase.ts in task-backend..."
(cd task-backend && npx ts-node src/setup/setupDatabase.ts)
