
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

```js
await fetch(".../v1/incidents/all?limit=${limit}", {
  method: "GET",
  cache: "default",
  mode: "cors",
  redirect: "follow"
});
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `limit` | `int` | **Required**. The limit amount (Max at 30) |

#### Create a new item

```js
await fetch(".../v1/incidents/create", {
  method: "POST",
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
    "X-Authorization-Token" : api_key
  },
  redirect: "follow",
  body: JSON.stringify({
    name: name,
    lastOccurred: date,
    severity: severity
  })
});
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `api_key`      | `string` | **Required**. API Key |
| `name`      | `string` | **Required**. Name of the incident |
| `date`      | `string` | **Required**. Date of last occurrence |
| `severity`      | `string` | **Required**. Severity type (none, calm, mild, severe) |


  
