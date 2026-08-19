import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo'
import { AppResolver } from './app.resolver';
import { ComponentsModule } from './components/components.module';
import { DatabaseModule } from './database/database.module';
import { T } from './libs/types/common';
import { GraphQLFormattedError } from 'graphql';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    GraphQLModule.forRoot({
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
    ComponentsModule, 
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
