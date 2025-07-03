const resquestHandler = (req, res) => {
  const { url } = req
  if(url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    return res.end('Home\n')
  }

  if(url === '/list') {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    return res.end('List\n')
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' })
  return res.end('Not Found\n')
}

export default resquestHandler