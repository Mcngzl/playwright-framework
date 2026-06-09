export interface TestUser {
  username: string;
  password: string;
}

export class UserFactory {
  static validUser(): TestUser {
    return {
      username: 'tomsmith',
      password: 'SuperSecretPassword!',
    };
  }

  static invalidUser(): TestUser {
    return {
      username: 'invalid_user',
      password: 'wrong_password',
    };
  }

  static emptyCredentials(): TestUser {
    return {
      username: '',
      password: '',
    };
  }

  static customUser(username: string, password: string): TestUser {
    return { username, password };
  }
}
