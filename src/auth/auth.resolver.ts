import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation(() => String)
  login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    return this.auth.login(username, password).accessToken;
  }
}
