echo "Stopping running app.."
docker compose down app

echo "Pulling the latest version.."
docker compose pull app

echo "Restarting..."
docker compose up -d app

echo "Restart completed!"