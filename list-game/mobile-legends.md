---
description: Mobile Legends game kikir dari munton
---

# Mobile Legends

{% hint style="info" %}
**Required Fields** dikirim dalam bentuk query params
{% endhint %}

## Get MLBB

<mark style="color:green;">`GET`</mark> `/mlbb`

## Required Fields

| Name | Value    |
| ---- | -------- |
| id   | `string` |
| zone | `string` |

### Example Request

```
http://localhost:3000/mlbb?id=469123581&zone=2418
```

### Response

{% tabs %}
{% tab title="200" %}
```json
{
  "game": "Mobile Legends: Bang Bang",
  "account": {
    "ign": "Erikaaaa",
    "id": "469123581",
    "zone": "2418"
  }
}
```
{% endtab %}

{% tab title="400" %}
```json
{
  "error": {
    "name": "Not Found",
    "message": "IGN Tidak Ditemukan"
  }
}
```
{% endtab %}

{% tab title="422" %}

{% endtab %}
{% endtabs %}

