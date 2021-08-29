'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //adviser-userId
    await queryInterface.addConstraint('advisers', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_adviser_user',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    //feedback-adviserId
    await queryInterface.addConstraint('feedbacks', {
      fields: ['adviserId'],
      type: 'foreign key',
      name: 'fk_feedback_adviser',
      references: {
        table: 'advisers',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    //feedback-postId
    await queryInterface.addConstraint('feedbacks', {
      fields: ['postId'],
      type: 'foreign key',
      name: 'fk_feedback_post',
      references: {
        table: 'posts',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    //post-feedbacks
    await queryInterface.addConstraint('posts', {
      fields: ['selected'],
      type: 'foreign key',
      name: 'fk_post_feedback',
      references: {
        table: 'feedbacks',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    //post-feedbacks
    await queryInterface.addConstraint('posts', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_post_user',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    //source-post
    await queryInterface.addConstraint('sources', {
      fields: ['postId'],
      type: 'foreign key',
      name: 'fk_source_post',
      references: {
        table: 'posts',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    //message-user
    await queryInterface.addConstraint('messages', {
      fields: ['sender'],
      type: 'foreign key',
      name: 'fk_message_sender',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    //message-user
    await queryInterface.addConstraint('messages', {
      fields: ['receiver'],
      type: 'foreign key',
      name: 'fk_message_receiver',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    //message-user
    await queryInterface.addConstraint('messages', {
      fields: ['chatId'],
      type: 'foreign key',
      name: 'fk_message_chat',
      references: {
        table: 'chats',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    //chat-user join
    await queryInterface.addConstraint('chats_users', {
      fields: ['chatId'],
      type: 'foreign key',
      name: 'fk_join_chat',
      references: {
        table: 'chats',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    //chat-user join
    await queryInterface.addConstraint('chats_users', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_join_user',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('advisers', 'fk_adviser_user');
    await queryInterface.removeConstraint('feedbacks', 'fk_feedback_adviser');
    await queryInterface.removeConstraint('feedbacks', 'fk_feedback_post');
    await queryInterface.removeConstraint('posts', 'fk_post_feedback');
    await queryInterface.removeConstraint('posts', 'fk_post_user');
    await queryInterface.removeConstraint('sources', 'fk_source_post');
    await queryInterface.removeConstraint('messages', 'fk_message_sender');
    await queryInterface.removeConstraint('messages', 'fk_message_receiver');
    await queryInterface.removeConstraint('messages', 'fk_message_chat');
    await queryInterface.removeConstraint('chats_users', 'fk_join_chat');
    await queryInterface.removeConstraint('chats_users', 'fk_join_user');
  },
};
