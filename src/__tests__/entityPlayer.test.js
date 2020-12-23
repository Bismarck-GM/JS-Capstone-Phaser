/* eslint-disable no-unused-vars */
import Entity from '../entities/Entities';
import Player from '../entities/Player';

require('jest-canvas-mock');

jest.mock('../entities/Entities');

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  Entity.mockClear();
});

it('Check if the Player Instance called the Entity class constructor', () => {
  const user = new Player();
  expect(Entity).toHaveBeenCalledTimes(1);
});

it('Check amount of method calls.', () => {
  expect(Entity).not.toHaveBeenCalled();
  const user = new Player();
  expect(Entity).toHaveBeenCalledTimes(1);
  const mockEntityInstance = Entity.mock.instances[0];

  const mockSetData = mockEntityInstance.setData;
  expect(mockSetData).toHaveBeenCalledTimes(4);
  const mockSetDisplaySize = mockEntityInstance.setDisplaySize;
  expect(mockSetDisplaySize).toHaveBeenCalledTimes(1);
  const mockPlay = mockEntityInstance.play;
  expect(mockPlay).toHaveBeenCalledTimes(1);
});

it('Check if Player SetData - Speed is created and its value is correct', () => {
  expect(Entity).not.toHaveBeenCalled();
  const user = new Player();
  expect(Entity).toHaveBeenCalledTimes(1);

  const mockEntityInstance = Entity.mock.instances[0];
  const mockSetData = mockEntityInstance.setData;
  expect(mockSetData.mock.calls[0][0]).toEqual('speed');
  expect(mockSetData.mock.calls[0][1]).toEqual(200);
});

it('Check if Player SetData - isShooting is created and its value is correct', () => {
  expect(Entity).not.toHaveBeenCalled();
  const user = new Player();
  expect(Entity).toHaveBeenCalledTimes(1);

  const mockEntityInstance = Entity.mock.instances[0];
  const mockSetData = mockEntityInstance.setData;
  expect(mockSetData.mock.calls[1][0]).toEqual('isShooting');
  expect(mockSetData.mock.calls[1][1]).toEqual(false);
});

it('Check if Player SetData - timerShootDelay is created and its value is correct', () => {
  expect(Entity).not.toHaveBeenCalled();
  const user = new Player();
  expect(Entity).toHaveBeenCalledTimes(1);

  const mockEntityInstance = Entity.mock.instances[0];
  const mockSetData = mockEntityInstance.setData;
  expect(mockSetData.mock.calls[2][0]).toEqual('timerShootDelay');
  expect(mockSetData.mock.calls[2][1]).toEqual(10);
});

it('Check if Player SetData - timerShootTick is created and its value is correct', () => {
  expect(Entity).not.toHaveBeenCalled();
  const user = new Player();
  expect(Entity).toHaveBeenCalledTimes(1);

  const mockEntityInstance = Entity.mock.instances[0];
  const mockSetData = mockEntityInstance.setData;
  expect(mockSetData.mock.calls[3][0]).toEqual('timerShootTick');
  expect(mockSetData.mock.calls[3][1]).toEqual(NaN);
});

it('Check if Player Custom Methods for movement are created', () => {
  expect(Entity).not.toHaveBeenCalled();
  const user = new Player();
  expect(Entity).toHaveBeenCalledTimes(1);

  expect(user).toHaveProperty('moveUp');
  expect(user).toHaveProperty('moveDown');
  expect(user).toHaveProperty('moveLeft');
  expect(user).toHaveProperty('moveRight');
});