import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo'
import { AppResolver } from './app.resolver';
import { ComponentsModule } from './components/components.module';
import { DatabaseModule } from './database/database.module';
import { GraphQLFormattedError } from 'graphql';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    ConfigModule.forRoot(),      // Reading => .env 
    GraphQLModule.forRoot({      // Building GraphQL API + Error handling
      driver: ApolloDriver,
      playgarund: true,
      uploads: false,
      autoSchemaFile: true,
      formatError: (error: GraphQLFormattedError) => {
        const message =
          (error?.extensions?.exception as any)?.response?.message ||
          (error?.extensions?.response as any)?.message ||
          error?.message;

        const graphQLFormattedError = {
          message,
          extensions: {
            code: error.extensions?.code ?? 'INTERNAL_SERVER_ERROR',
          },
        };

        console.log('GRAPHQL GLOBAL ERR:', graphQLFormattedError);
        return graphQLFormattedError;
      },
    }),
    ComponentsModule, // Assosiy mantiqlarimiz
    DatabaseModule, // Connection to DB
    SocketModule, // WebSocket Gateway  
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver,],
})
export class AppModule { }
