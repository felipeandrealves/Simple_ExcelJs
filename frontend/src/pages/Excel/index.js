import React, { Component } from "react";
import { v4 as uuid } from "uuid";
import { RiFileExcel2Line } from "react-icons/ri";
import { FiTrash2, FiLoader } from "react-icons/fi";
import StringMask from "string-mask";
import { saveAs } from "file-saver";

import api from "../../services/api";

import Container from "../../components/Container";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Form, Float, List, Boat, TrashButton, Alert } from "./style";

const mask = new StringMask("+00 (00) 0 0000-0000");

export default class Excel extends Component {
  state = {
    isLoading: false,
    limit: false,
    sucess: false,
    users: [],
    name: "",
    email: "",
    phone: "",
  };

  componentDidMount() {
    const users = localStorage.getItem("users");

    this.setState({ users: JSON.parse(users) });

    console.log("Componentes carregados");
  }

  componentDidUpdate(_, prevState) {
    const { users } = this.state;

    if (prevState.users !== this.users) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { users, name, email, phone } = this.state;

    if (users.length === 8) {
      this.setState({ limit: true });

      setTimeout(() => {
        this.setState({ limit: false });
      }, 3000);

      this.setState({
        name: "",
        email: "",
        phone: "",
      });
    } else {
      const phoneMasked = mask.apply(phone);

      const data = {
        id: uuid(),
        name,
        email,
        phone: phoneMasked,
      };

      this.setState({
        users: [...users, data],
        name: "",
        email: "",
        phone: "",
      });
    }
  };

  handleExcludeClick = (id) => () => {
    const { users } = this.state;

    const excludUserIndex = users.findIndex((user) => user.id === id);

    users.splice(excludUserIndex, 1);

    this.setState({ users: users });
  };

  handleGenerateReport = async () => {
    const { users } = this.state;
    try {
      this.setState({ isLoading: true });

      const seconds = new Date().getTime();

      await api({
        method: "POST",
        url: "/excel/users",
        data: users,
        responseType: "blob",
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));

        saveAs(url, seconds + " - Relatorio.xlsx");
      });

      this.setState({ sucess: true });

      setTimeout(() => {
        this.setState({ sucess: false });
      }, 3000);

      this.setState({ isLoading: false });
    } catch (e) {
      console.log(e);
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { users, name, email, phone, isLoading, limit, sucess } = this.state;

    return (
      <>
        {limit ? (
          <Alert color="danger">Limite de usuarios atingido</Alert>
        ) : null}

        {sucess ? <Alert color="sucess">Arquivo baixado</Alert> : null}

        <Boat>
          <Container>
            <h1>Gerar realatorio de usuarios</h1>
            <Form onSubmit={this.handleSubmit}>
              <fieldset>
                <legend>Adicionar usuario</legend>
                <Input
                  placeholder="Nome"
                  onChange={(e) => this.setState({ name: e.target.value })}
                  value={name}
                  disabled={isLoading}
                  required
                />
                <Input
                  placeholder="E-mail"
                  type="email"
                  onChange={(e) => this.setState({ email: e.target.value })}
                  value={email}
                  disabled={isLoading}
                  required
                />
                <Input
                  placeholder="Telefone"
                  onChange={(e) => this.setState({ phone: e.target.value })}
                  value={phone}
                  disabled={isLoading}
                  required
                />
                <Button className="b" type="submit" disabled={isLoading}>
                  Adicionar
                </Button>
              </fieldset>
            </Form>

            <Button
              className="g"
              loading={isLoading ? 1 : undefined}
              onClick={this.handleGenerateReport}
            >
              {isLoading ? (
                <FiLoader></FiLoader>
              ) : (
                <>
                  <RiFileExcel2Line />
                  Gerar Relatorio
                </>
              )}
            </Button>

            <Float>
              <List>
                {users.length === 0 ? (
                  <p>Insira algum usuario</p>
                ) : (
                  users.map((user) => (
                    <li key={user.id}>
                      <div>
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                      </div>
                      <div>
                        <TrashButton onClick={this.handleExcludeClick(user.id)}>
                          <FiTrash2 />
                        </TrashButton>
                      </div>
                    </li>
                  ))
                )}
              </List>
            </Float>
          </Container>
        </Boat>
      </>
    );
  }
}
