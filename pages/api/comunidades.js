import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {
    
    const TOKEN = process.env.REACT_APP_TOKEN_FULL_ACCESS;
    //console.log(TOKEN);
    
    if(request.method === 'POST') {

        const idModel = "972695"; // ID do Model de "Communities" criado pelo Dato

        const client = new SiteClient(TOKEN);
        
        // Validar os dados, antes de sair cadastrando
        const registroCriado = await client.items.create({
            itemType: idModel, 
            ...request.body,
        })
    
        console.log(registroCriado);
    
        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,
        })
        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}