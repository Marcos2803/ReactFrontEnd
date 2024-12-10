'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { UserService } from '@/demo/service/AuthService';



/* @todo Used 'as any' for types here. Will fix in next version due to onSelectionChange event type issue. */
const User = () => {
    let emptyUser: Auth.User = {
        id: '',
        primeiroNome: '',
        sobreNome: '',
        celular: '',
        email: '',
        password:'' ,
        confirmPassword: '',
       
  
    };
    

    const [users, setUsers] = useState<Auth.User[]>([]); // Inicialização como array vazio
    const [usersDialog, setUsersDialog] = useState(false);       /* cadastra produto*/
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [deleteUsersDialog, setDeleteUsersDialog] = useState(false);
    const [user, setUser] = useState<Auth.User>(emptyUser);
    const [selectedUsers, setSelectedUsers] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);

    /*busca lista de produtos no productservice*/
    
    useEffect(() => {
        UserService.getUsers().then((data: any) => {
            console.log('Dados retornados:', data);
            setUsers(data as any);
        });
    }, []);

   /* botao novo */
    const openNew = () => {
        setUser(emptyUser);
        setSubmitted(false);
        setUsersDialog(true);
    };

   

    const hideDialog = () => {
        setSubmitted(false);
        setUsersDialog(false);
    };

    
    
    /* botao  excluir*/
    const hideDeleteUsersDialog = () => {
        setDeleteUsersDialog(false);
    };

    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    };

    

  /* Toast  criar e atualizar o produto */
  const saveUser = async () => {
    setSubmitted(true);
      try {
        if (user.id) {
          // Se for uma atualização (editar)
          await UserService.updateUser(user.id, user);
          toast.current?.show({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Usuário atualizado com sucesso',
            life: 3000,
          });
        } else {
          // Se for um novo cadastro
          const newUser = await UserService.createUser(user);
          setUsers([...users, newUser]); // Adiciona o novo usuário à lista
          toast.current?.show({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Usuário cadastrado com sucesso',
            life: 3000,
          });
        }
  
        setUsersDialog(false);
        setUser(emptyUser);
      } catch (error) {
        console.error('Erro ao salvar usuário:', error);
        toast.current?.show({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao salvar usuário',
          life: 3000,
        });
      }
    
  };
  


     /* editar e excluir*/
    const editUser = (user: Auth.User) => {
        setUser({ ...user });
        setUsersDialog(true);
    };
    /* editar e excluir*/
    const confirmDeleteUser = (user: Auth.User) => {
        setUser(user);
        setDeleteUserDialog(true);
    };



   /*exclui produto */
    const deleteUser = () => {
        let _users = (users as any)?.filter((val: any) => val.id !== user.id);
        setUsers(_users);
        setDeleteUserDialog(false);
        setUser(emptyUser);
        toast.current?.show({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Usuário excluido com sucesso',
            life: 3000
        });
    };

    
 /* ta chamndo ele no Toast  criar e atualizar o produto */
    const findIndexById = (id: string) => {
        let index = -1;
        for (let i = 0; i < (users as any)?.length; i++) {
            if ((users as any)[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };


    const exportCSV = () => {
        dt.current?.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteUsersDialog(true);
    };


    /*excluir lista */

    const deleteSelectedUsers = () => {
        let _users = (users as any)?.filter((val: any) => !(selectedUsers as any)?.includes(val));
        setUsers(_users);
        setDeleteUsersDialog(false);
        setSelectedUsers(null);
        toast.current?.show({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Usuário excluido com sucesso',
            life: 3000
        });
    };



    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, nome: string) => {
        const val = (e.target && e.target.value) || '';
        let _user = { ...user };
        _user[`${nome}`] = val;

        setUser(_user);
    };




    /* botao novo e excluir componente react*/
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Novo Usuário" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
                    <Button label="Excluir" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedUsers || !(selectedUsers as any).length} />
                </div>
            </React.Fragment>
        );
    };


    /* exporta para excel*/

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                
                <Button label="Exportar" icon="pi pi-upload" severity="help" onClick={exportCSV} />
            </React.Fragment>
        );
    };




    
    /* os dados do banco passa por aqui */
    const idBodyTemplate = (rowData: Auth.User) => {
        return (
            <>
                <span className="p-column-title">Code</span>
                {rowData.id}
            </>
        );
    };
      //coluna do nome
    const nomeBodyTemplate = (rowData: Auth.User) => {
        return (
            <>
                <span className="p-column-title">Nome</span>
                {rowData.primeiroNome}
            </>
        );
    };

    const sobrenomeBodyTemplate = (rowData: Auth.User) => {
        return (
            <>
                <span className="p-column-title">SobreNome</span>
                {rowData.sobreNome}
            </>
        );
    };


    const emailBodyTemplate = (rowData: Auth.User) => {
        return (
            <>
                <span className="p-column-title">Email</span>
                {rowData.email}
            </>
        );
    };

    const celularBodyTemplate = (rowData: Auth.User) => {
        return (
            <>
                <span className="p-column-title">Celular</span>
                {rowData.celular} 
            </>
        );
    };

   

    /* editar e excluir*/

    const actionBodyTemplate = (rowData: Auth.User) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editUser(rowData)} />
                <Button icon="pi pi-trash" rounded severity="danger" onClick={() => confirmDeleteUser(rowData)} />
            </>
        );
    };


    

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Gerenciar usuário</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Pesquisar..." />
            </span>
        </div>
    );




    /* alerta de cadastra delete produto e lista */
    const userDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" text onClick={saveUser} />
        </>
    );
    const deleteUserDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" text onClick={hideDeleteUserDialog} />
            <Button label="Sim" icon="pi pi-check" text onClick={deleteUser} />
        </>
    );
    const deleteUsersDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" text onClick={hideDeleteUserDialog} />
            <Button label="Sim" icon="pi pi-check" text onClick={deleteSelectedUsers} />
        </>
    );


 
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                    <DataTable
                        ref={dt}
                        value={users}
                        selection={selectedUsers}
                        onSelectionChange={(e) => setSelectedUsers(e.value as any)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} usuarios"
                        globalFilter={globalFilter}
                        emptyMessage="Nenhum usuário encontrado."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="id" header="Id" sortable body={idBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="nome" header="Nome" sortable body={nomeBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="sobrename" header="SobreNome" sortable body={sobrenomeBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="celular" header="celular" body={celularBodyTemplate} sortable></Column>
                        <Column field="email" header="email" sortable body={emailBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>



                    
               
                    <Dialog visible={usersDialog} style={{ width: '450px' }} header="Cadastro de usuário" modal className="p-fluid" footer={userDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="primeironome">Name</label>
                            <InputText
                                id="primeiroNome"
                                value={user.primeiroNome}
                                onChange={(e) => onInputChange(e, 'primeiroNome')}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !user.primeiroNome
                                })}
                            />

                            {submitted && !user.primeiroNome && <small className="p-invalid">Nome é obrigatório.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="sobrenome">Sobre Nome</label>
                            <InputText
                                id="sobreNome"
                                value={user.sobreNome}
                                onChange={(e) => onInputChange(e, 'sobreNome')}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !user.sobreNome
                                })}
                            />

                            {submitted && !user.sobreNome && <small className="p-invalid">Sobre nome é obrigatório.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="celular">Celular</label>
                            <InputText
                                id="celular"
                                value={user.celular}
                                onChange={(e) => onInputChange(e, 'celular')}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !user.celular
                                })}
                            />

                            {submitted && !user.celular && <small className="p-invalid">Celular é obrigatório.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <InputText
                                id="email"
                                value={user.email}
                                onChange={(e) => onInputChange(e, 'email')}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !user.email
                                })}
                            />

                            {submitted && !user.email && <small className="p-invalid">Email é obrigatório.</small>}
                        </div>
                        

                            <div className="field">
                            <label htmlFor="password">Senha</label>
                            <InputText
                                id="password"
                                type="password"
                                value={user.password}
                                onChange={(e) => onInputChange(e, 'password')}
                                required
                                autoComplete="new-password"
                                className={classNames({
                                'p-invalid': submitted && !user.password
                                })}
                            />
                            {submitted && !user.password && <small className="p-invalid">Senha é obrigatória.</small>}
                            </div>

                            <div className="field">
                            <label htmlFor="confirmPassword">Confirme a Senha</label>
                            <InputText
                                id="confirmPassword"
                                type="password"
                                value={user.confirmPassword}
                                onChange={(e) => onInputChange(e, 'confirmPassword')}
                                required
                                autoComplete="new-password"
                                className={classNames({
                                'p-invalid': submitted && !user.confirmPassword
                                })}
                            />
                            {submitted && !user.confirmPassword && <small className="p-invalid">Confirme a senha é obrigatória.</small>}
                            {submitted && user.password && user.confirmPassword && user.password !== user.confirmPassword && (
                            <small className="p-invalid">As senhas não coincidem.</small>
        )}
                            </div>

 
                        
                    </Dialog>
                
                    <Dialog visible={deleteUserDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteUserDialogFooter} onHide={hideDeleteUserDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {user && (
                                <span>
                                    Tem certeza de que deseja excluir <b>{user.primeiroNome}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>


                 
                    <Dialog visible={deleteUsersDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteUsersDialogFooter} onHide={hideDeleteUsersDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {user && <span>Tem certeza de que deseja excluir os usuário selecionados?</span>}
                        </div>
                    </Dialog>


                    
                </div>
            </div>
        </div>
    );
};

export default User;