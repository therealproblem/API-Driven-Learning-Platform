echo "\n===================================="
echo "|       Installing Packages        |"
echo "===================================="
cd web && npm install &&
cd ../app && npm install && 
cd ../


echo "\n===================================="
echo "|          Set Up Docker           |"
echo "===================================="

cp .example.env         .env
cp users.example.yml    users.yml
cp ./app/.example.env   ./app/.env
cp ./web/.example.env   ./web/.env
docker compose up -d && sleep 5

echo "\n===================================="
echo "|        Insert Dummy Data         |"
echo "===================================="

URL="http://localhost:3000/api/dummy/generate"

HEADERS=(
    "Content-Type: application/json"
    # version selection not needed
    # but can be used as reference to modify scripts for future purposes
    "Accept: application/vnd.lxp.v1+json" 
)

CURL_CMD=(curl -s -X POST "$URL")

for h in "${HEADERS[@]}"; do
    CURL_CMD+=(-H "$h")
done

CURL_CMD+=(-d "$PAYLOAD" -w "\n%{http_code}")

RESPONSE=$("${CURL_CMD[@]}")
HTTP_STATUS=$(echo "$RESPONSE" | tail -n1)
RESPONSE_BODY=$(echo "$RESPONSE" | sed '$d')

if [[ "$HTTP_STATUS" =~ ^[0-9]+$ ]] && [ "$HTTP_STATUS" -eq 200 ]; then
    echo "✅ dummy data inserted successfully!\n"
    echo "Find more user login details in "
    echo "./app/src/controllers/dummyController.ts\n"
    echo "   Web URL : http://localhost:5173"
    echo "  username : test1@example.com"
    echo "  password : lxpUser1233!"
    echo "\n"
    echo "Dozzle URL : http://localhost:8080"
    echo "  username : admin"
    echo "  password : password"
else
    echo "‼️‼️‼️           FAILED            ‼️‼️‼️"
    echo "dummy data failed to insert. "
    echo "You can manually do a post request to\n"
    echo "http://localhost:3000/api/dummy/generate\n"
    echo "to generate the dummy data."
fi