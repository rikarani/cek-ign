# Ini Adalah Readme

sebenernya ni API tak bikin buat dipake sendiri sih hhe

## List Game

1. [Mobile Legends](#mobile-legends)

---

## Mobile Legends

### Endpoint

```
/mlbb?id=id&zone=zone
```

### Contoh Request

- pakek cURL

```bash
curl -G -d "id=469123581" -d "zone=2418" localhost:3000/mlbb
```

- atau kalo pakek HTTP Client (Postman, HTTPie)

```
http://localhost:3000/mlbb?id=469123581&zone=2418
```

- atau kalo pakek Fetch API

```ts
async function apalah() {
  const hit = await fetch("http://localhost:3000/mlbb?id=469123581&zone=2418");
  const response = await hit.json();

  return response;
}
```

### Contoh Response Sukses

```json
{
  "ign": "Erikaaaa",
  "userId": "469123581",
  "zoneId": "2418"
}
```

### Contoh Response Gagal

- 404 Not Found

trigger kalau IGN yang dicari ndak ada

```json
{
  "success": false,
  "error": {
    "name": "Not Found",
    "message": "IGN Tidak Ditemukan"
  }
}
```

- 422 Unprocessable Entity

trigger kalau :

1. `id` dan `zone` ndak ada
2. `id` ndak ada
3. `zone` ndak ada

```json
{
  "success": false,
  "errors": [
    {
      "path": "/id",
      "message": "Expected string",
      "summary": "Expected property 'id' to be string but found: undefined"
    },
    {
      "path": "/zone",
      "message": "Expected string",
      "summary": "Expected property 'zone' to be string but found: undefined"
    }
  ]
}
```
