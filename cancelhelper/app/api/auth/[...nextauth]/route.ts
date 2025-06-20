import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // For now, we'll use a simple validation
          // In production, you'd hash passwords and store users in Supabase
          console.log('NextAuth: Attempting to authorize user:', credentials.email)
          
          // Placeholder user validation
          // TODO: Implement proper user authentication with Supabase
          const user = {
            id: '1',
            email: credentials.email,
            name: credentials.email.split('@')[0]
          }

          console.log('NextAuth: User authorized:', user)
          return user
        } catch (error) {
          console.error('NextAuth: Authorization error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        // TODO: Fix TypeScript types for session.user
        // session.user.id = token.id as string
        // session.user.email = token.email as string
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST } 