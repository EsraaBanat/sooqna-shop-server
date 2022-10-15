'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const userModel = (sequelize, DataTypes) => {
    const model = sequelize.define('Users', {
        username: {
            type: DataTypes.STRING,
            required: true,
        },
        email: {
            type: DataTypes.STRING,
            required: true,
            validate: {
                isEmail: true
            }
        },
        phonenumber: {
            type: DataTypes.STRING,
            required: true
        },
        password: {
            type: DataTypes.STRING,
            required: true,
            validate: {
                is: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/gm
            },
            set(value) {
                const salt = bcrypt.genSaltSync(5);
                const hash = bcrypt.hashSync(value, salt);
                this.setDataValue('password', hash);
            }
        },
        adress: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.ENUM('user', 'admin'),
            required: true,
            defaultValue: 'user'
        },
        token: {
            type: DataTypes.VIRTUAL,
            get() {
                return jwt.sign({
                    username: this.username
                }, secret);
            },
            set(tokenObj) {
                let token = jwt.sign(tokenObj, secret);
                return token;
            }
        },
        actions: {
            type: DataTypes.VIRTUAL,
            get() {
                const acl = {
                    user: ['read', 'create', 'update', 'delete'],
                    admin: ['read', 'create', 'update', 'delete']
                };
                return acl[this.role];
            }
        }
    });
    model.authenticateBasic = async function (username, password) {
        const user = await this.findOne({
            where: {
                username: username
            }
        });
        const valid = await bcrypt.compare(password, user.password);
        if (valid) {
            return user;
        } else {
            throw new Error('Invalid User');
        }
    };
    model.authenticateToken = async function (token) {
        try {
            const parsedToken = jwt.verify(token, secret);
            const user = await this.findOne({
                where: {
                    username: parsedToken.username
                }
            });
            if (user) {
                return user;
            }
            throw new Error("User Not Found");
        } catch (e) {
            throw new Error(e.message)
        }
    };
    return model;
}

module.exports = userModel;