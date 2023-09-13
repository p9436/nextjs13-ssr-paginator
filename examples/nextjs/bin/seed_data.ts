import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const names = [
        'Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 
        'Grace', 'Henry', 'Ivy', 'Jack', 'Katherine', 'Liam', 
        'Mia', 'Noah', 'Olivia', 'Penelope', 'Quinn', 'Ryan', 
        'Sophia', 'Thomas', 'Ursula', 'Violet', 'William', 'Xander', 
        'Yasmine', 'Zoe'
    ];

    for (const name of names) {
        const email = `${name.toLowerCase()}@example.com`; // Generate email based on the name

        await prisma.user.create({ data: { name, email } });
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
