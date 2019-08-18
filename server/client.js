class Client
{
    constructor(conn, id)
    {
        this.conn = conn;
        this.id = id;
        this.session = null;

        this.state = {
            arena: {
                matrix: [],
            },
            player: {
                matrix: [],
                pos: {x: 0, y: 0},
                score: 0,
            },
        };
    }

    broadcast(data)
    {
        if (!this.session)
        {
            throw new Error("Cannot broadcast without session");
        }
        data.clientId = this.id;

        this.session.clients.forEach(client => {
            if (this === client){
                return;
            }
            client.send(data);
        });
    }

    send(data)
    {
        const msg = JSON.stringify(data);
        console.log('Sending message ', msg);
        this.conn.send(msg, function ack(err){
            if (err){
                console.error('Message failed', msg, err);
            }
        });
    }
}

module.exports = Client;