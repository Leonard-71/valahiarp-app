export async function sendDiscordNotification(data: {
  customerName: string;
  customerEmail: string;
  customerUsername?: string;
  subscriptionName: string; 
  price: number;
  invoiceUrl: string;
  date: string;
}): Promise<void> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.error('DISCORD_WEBHOOK_URL not configured');
    return;
  }
  


  const message = { 
    embeds: [{
      title: " COMANDA NOUĂ ",
      description: "**Un nou client a finalizat o cumpărare pe platforma Valahia RP**\n\u200b",
      color: 0x00ff00,
      fields: [
        {
          name: "👤 **DETALII CLIENT**",
          value: `**\n Nume:** ${data.customerName}\n**Email:** \`${data.customerEmail}\`\n**Discord:** ${data.customerUsername ? `@${data.customerUsername}` : '*Nu este setat*'}\n**Discord ID:** ${data.customerUsername ? `\`${data.customerUsername}\`` : '*Nu este setat*'}`,
          inline: false
        },
        {
            name: "\u200b",
            value: "\u200b",
            inline: false
        },
        {
          name: "📦 **DETALII COMANDĂ**",
          value: `**\n Abonament:** ${data.subscriptionName}\n**Preț:** **${data.price} EUR**\n**Data:** ${data.date.split(' la ')[0]}\n**Ora:** ${data.date.split(' la ')[1]}`,
          inline: false
        },
        {
            name: "\u200b",
            value: "\u200b",
            inline: false
          },
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: "Valahia RP • Sistem de notificări automate", 
      }
    }]
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });

    if (response.ok) {
      console.log('Discord notification sent');
    } else {
      console.error('Discord webhook failed:', response.status);
    }
  } catch (error) {
    console.error('Discord webhook error:', error);
  }
}
