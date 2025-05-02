class ModelPessoa {
  private id?: number;
  private nome: string;
  private email: string;
  private cpf: string;
  private ativo: boolean;
  private role: string;
  private updatedAt?: Date;
  private createdAt?: Date;

    constructor(id: number, nome: string, email: string, 
                cpf: string, ativo: boolean, role: string, 
                updatedAt: Date, createdAt: Date)
  {
    this.id        = id
    this.nome      = nome;
    this.email     = email
    this.cpf       = cpf;
    this.ativo     = ativo;
    this.role      = role;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
  }


  public getId(): number | undefined {
    return this.id;
  }

  public getNome(): string {
    return this.nome;
  }

  public getEmail(): string {
    return this.email;
  }

  public getCpf(): string {
    return this.cpf;
  }

  public isAtivo(): boolean {
    return this.ativo;
  }

  public getAtivo() {
    return this.ativo ? 'Sim' : 'Não';
  }

  public getRole(): string {
    return this.role;
  }

  public getUpdatedAt(): Date  | undefined {
    return this.updatedAt;
  }

  public getCreatedAt(): Date | undefined{
    return this.createdAt;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public setNome(nome: string): void {
    this.nome = nome;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public setCpf(cpf: string): void {
    this.cpf = cpf;
  }

  public setAtivo(ativo: boolean): void {
    this.ativo = ativo;
  }

  public setRole(role: string): void {
    this.role = role;
  }

  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }

  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

}

export default ModelPessoa;