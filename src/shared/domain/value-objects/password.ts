import * as bcrypt from 'bcrypt';

type PasswordProps = {
  value: string;
};

export default class Password {
  readonly value: string;

  constructor({ value }: PasswordProps) {
    this.ensureMinLength(value);
    this.value = value;
  }

  private ensureMinLength(value: string, minLength = 6): void {
    if (value.length < minLength) {
      throw new Error(
        `Password must be at least ${minLength} characters long.`,
      );
    }
  }

  static secureFormat(value: string): string {
    return value.replace(/./g, '*');
  }

  async toHashed(): Promise<string> {
    return bcrypt.hash(this.value, 10);
  }

  async matches(hashedValue: string): Promise<boolean> {
    return bcrypt.compare(this.value, hashedValue);
  }
}
