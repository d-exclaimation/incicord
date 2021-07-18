
# Incicord

A Record for my incidents and how long has it been


## Features

- Cool
- Relative time
- API available
- Concurrency involved with real life changes
- idk, I am too lazy to check and you probably see why

  
## Demo

Insert gif or link to demo

  
## API Reference

#### Get all items

```http
  GET /v1/incidents/all?limit=<limit>
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `limit` | `int` | **Required**. The limit amount (Max at 30) |

#### Get item

```http
  POST /v1/incidents/create
  Header:
    "X-Authorization-Token" : <api_key>
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `api_key`      | `string` | **Required**. API Key |

  
