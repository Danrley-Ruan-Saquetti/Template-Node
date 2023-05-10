import { generatedId } from '../util/generated-id'
import { ErrorGeneral } from '../util/error'

export type CollectionName = string;
export interface Collection {
	name: CollectionName;
	data: any[];
}
export interface TLogUpdate {
	matchedCount: number;
	modifiedCount: number;
	upsertedCount: number;
	upsertedId: null;
}

const MAP_OPERATORS = [
	{ name: '$set', type: 'update' },
	{ name: '$push', type: 'update' },
	{ name: '$each', type: 'update' },
	{ name: '$in', type: 'update' },
	{ name: '$pull', type: 'update' },
	{ name: '$pullAll', type: 'update' },
	{ name: '$in', type: 'query' },
] as const

export function newLocalDB() {
	const localData: { [collectionName: CollectionName]: Collection } = {}

	const MAP_FORMS = {
		update: {
			$set: (data: any, value: any) => {
				if (!Array.isArray(data)) {
					const newData = { ...data }
					for (const key in value) {
						if (Array.isArray(newData[key])) {
							if (typeof value[key] != 'object') {
								if (
									!newData[key].find((_dat: any) => {
										return _dat == value[key]
									})
								) {
									newData[key].push(value[key])
								}
							} else {
								for (const key_1 in value[key]) {
									const operator = MAP_OPERATORS.find((_oper) => {
										return _oper.name == key_1 && _oper.type == 'update'
									})
									if (operator) {
										newData[key] = MAP_FORMS['update'][operator.name](
											newData[key],
											value[key][key_1]
										)
									}
								}
							}
						} else {
							newData[key] = value[key]
						}
					}
					return newData
				}

				const newData = []
				for (let i = 0; i < value.length; i++) {
					const isAlreadyinArray = data.find((_dat: any) => {
						return _dat == value[i]
					})
					if (!isAlreadyinArray) {
						newData.push(value[i])
					}
				}

				return newData
			},
			$push: (data: any, value: any) => {
				if (!Array.isArray(data)) {
					const newData = { ...data }
					for (const key in value) {
						if (Array.isArray(newData[key])) {
							if (typeof value[key] != 'object') {
								const operator = MAP_OPERATORS.find((_oper) => {
									return _oper.name == key && _oper.type == 'update'
								})
								if (operator) {
									newData[key] = MAP_FORMS['update'][operator.name](
										newData,
										value[key],
										'$push'
									)
								} else {
									newData[key].push(value[key])
								}
							} else {
								for (const key_1 in value[key]) {
									const operator = MAP_OPERATORS.find((_oper) => {
										return _oper.name == key_1 && _oper.type == 'update'
									})
									if (operator) {
										newData[key] = MAP_FORMS['update'][operator.name](
											newData[key],
											value[key][key_1],
											'$push'
										)
									}
								}
							}
						}
					}

					return newData
				}

				const newData = []
				for (let i = 0; i < value.length; i++) {
					newData.push(value[i])
				}

				return newData
			},
			$each: (
				data: any,
				value: any[],
				formType:
					| '$set'
					| '$push'
					| '$pull'
					| '$each'
					| '$in'
					| '$pullAll' = '$set'
			) => {
				let newData = [...data]

				const newValues = MAP_FORMS['update'][formType](newData, value)

				newData = [...newData, ...newValues]

				return newData
			},
			$pull: (data: any, value: any) => {
				if (!Array.isArray(data)) {
					const newData = { ...data }
					for (const key in value) {
						if (Array.isArray(newData[key])) {
							if (typeof value[key] != 'object') {
								const operator = MAP_OPERATORS.find((_oper) => {
									return _oper.name == key && _oper.type == 'update'
								})
								if (operator) {
									newData[key] = MAP_FORMS['update'][operator.name](
										newData,
										value[key],
										'$pull'
									)
								} else {
									let index
									do {
										index = newData[key].findIndex((_dat: any) => {
											return _dat == value[key]
										})
										if (index >= 0) {
											newData[key].splice(index, 1)
										}
									} while (index >= 0)
								}
							} else {
								for (const key_1 in value[key]) {
									const operator = MAP_OPERATORS.find((_oper) => {
										return _oper.name == key_1 && _oper.type == 'update'
									})
									if (operator) {
										newData[key] = MAP_FORMS['update'][operator.name](
											newData[key],
											value[key][key_1],
											'$pull'
										)
									}
								}
							}
						}
					}

					return newData
				}

				const newData = [...data]

				for (let i = 0; i < value.length; i++) {
					for (let j = 0; j < newData.length; j++) {
						if (value[i] == newData[j]) {
							newData.splice(j, 1)
						}
					}
				}

				return newData
			},
			$pullAll: (data: any, value: any) => {
				if (!Array.isArray(data)) {
					const newData = { ...data }
					for (const key in value) {
						if (Array.isArray(newData[key])) {
							if (typeof value[key] != 'object') {
								const operator = MAP_OPERATORS.find((_oper) => {
									return _oper.name == key && _oper.type == 'update'
								})
								if (operator) {
									newData[key] = MAP_FORMS['update'][operator.name](
										newData,
										value[key],
										'$pullAll'
									)
								} else {
									const index = newData[key].findIndex((_dat: any) => {
										return _dat == value[key]
									})
									if (index >= 0) {
										newData[key].splice(index, 1)
									}
								}
							} else {
								for (const key_1 in value[key]) {
									const operator = MAP_OPERATORS.find((_oper) => {
										return _oper.name == key_1 && _oper.type == 'update'
									})
									if (operator) {
										newData[key] = MAP_FORMS['update'][operator.name](
											newData[key],
											value[key][key_1],
											'$pullAll'
										)
									}
								}
							}
						}
					}

					return newData
				}

				const newData = [...data]
				for (let i = 0; i < value.length; i++) {
					const index = newData.findIndex((_dat) => {
						return _dat == value[i]
					})

					if (index < 0) {
						continue
					}

					newData.splice(index, 1)
				}

				return newData
			},
			$in: (
				data: any,
				value: any[],
				formType:
					| '$set'
					| '$push'
					| '$pull'
					| '$each'
					| '$in'
					| '$pullAll' = '$pull'
			) => {
				const newData = data

				const newValues: any = MAP_FORMS['update'][formType](newData, value)

				return newValues
			},
		},
		query: {
			$in: (data: any, filters: any) => {
				for (let i = 0; i < filters.length; i++) {
					if (
						!data.find((_dat: any) => {
							return _dat == filters[i]
						})
					) {
						return false
					}
				}

				return true
			},
		},
	}

	const connectCollection = (coll: Collection) => {
		const insertOne = (data: any) => {
			const newData = {
				_id: generatedId(),
				...data,
			}
			localData[coll.name].data.push(newData)

			return newData
		}

		const insertMany = (datas: any[]) => {
			datas.forEach((_data) => insertOne(_data))
		}

		const drop = () => {
			return removeCollection(coll.name)
		}

		const find = (filters?: { [nameAttribute: string]: any }) => {
			let collList: any[] = []
			if (
				filters &&
				Object.keys(filters).some((key) => {
					return typeof filters[key] != 'undefined'
				})
			) {
				localData[coll.name].data.forEach((_data) => {
					let isValid = true
					for (const key in filters) {
						if (typeof filters[key] == 'undefined') {
							continue
						}
						if (Array.isArray(_data[key])) {
							if (typeof filters[key] == 'object') {
								for (const key_1 in filters[key]) {
									const operator = MAP_OPERATORS.find((_oper) => {
										return _oper.name == key_1 && _oper.type == 'query'
									})
									if (operator) {
										// @ts-expect-error
										isValid = MAP_FORMS['query'][operator.name](
											_data[key],
											filters[key][key_1]
										)
									} else {
										isValid = false
										break
									}
								}
							} else if (_data[key] != filters[key]) {
								isValid = false
								for (let i = 0; i < _data[key].length; i++) {
									if (_data[key][i] == filters[key]) {
										isValid = true
										break
									}
								}
							}
						} else {
							const operator = MAP_OPERATORS.find((_oper) => {
								return _oper.name == key
							})
							if (operator) {
								const valueFiltred = MAP_FORMS['update'][operator.name](
									localData[coll.name].data,
									filters[key]
								)
								isValid = false
								break
							} else if (_data[key] != filters[key]) {
								isValid = false
								break
							}
						}
					}
					isValid && collList.push(_data)
				})
			} else {
				collList = localData[coll.name].data
			}

			return collList
		}

		const findOne = (filters?: { [nameAttribute: string]: any }) => {
			let dataResult: any | null
			if (filters) {
				for (let i = 0; i < localData[coll.name].data.length; i++) {
					const _data = localData[coll.name].data[i]
					for (const key in filters) {
						if (
							MAP_OPERATORS.find((_oper) => {
								return _oper.name == key
							})
						) {
							continue
						}

						if (_data[key] != filters[key]) {
							dataResult = null
							break
						}

						dataResult = _data
					}

					if (!dataResult) {
						continue
					}

					return dataResult
				}
			} else {
				dataResult = localData[coll.name].data[0]
			}

			return dataResult
		}

		const findIndex = (filters?: { [nameAttribute: string]: any }) => {
			let dataResult: any | null
			let index = -1
			if (filters) {
				for (let i = 0; i < localData[coll.name].data.length; i++) {
					const _data = localData[coll.name].data[i]
					for (const key in filters) {
						if (
							MAP_OPERATORS.find((_oper) => {
								return _oper.name == key
							})
						) {
							continue
						}

						if (_data[key] != filters[key]) {
							dataResult = null
							break
						}

						dataResult = _data
					}

					if (!dataResult) {
						continue
					}

					index = i
					return index
				}
			} else {
				dataResult = localData[coll.name].data[0]
				index = 0
			}

			return index
		}

		const updateOne = (
			filters: { [nameAttribute: string]: any },
			value: { [nameAttribute: string]: any }
		) => {
			const log: TLogUpdate = {
				matchedCount: 0,
				modifiedCount: 0,
				upsertedCount: 0,
				upsertedId: null,
			}
			let data = findOne(filters)
			const index = findIndex(filters)

			if (!data || index < 0) {
				let newDataBody: any = {}

				for (const key in filters) {
					if (
						!MAP_OPERATORS.find((_oper) => {
							return _oper.name == key
						})
					) {
						newDataBody[key] = filters[key]
					}
				}
				for (const key in value) {
					const operator = MAP_OPERATORS.find((_oper) => {
						return _oper.name == key
					})
					if (operator) {
						// @ts-expect-error
						if (!MAP_FORMS[operator.type][operator.name]) {
							continue
						}

						// @ts-expect-error
						newDataBody = MAP_FORMS[operator.type][operator.name](
							newDataBody,
							value[key]
						)
					}
				}

				const newData = insertOne(newDataBody)

				log.upsertedId = newData._id
				log.upsertedCount = 1
			} else {
				if (localData[coll.name].data[index]) {
					for (const key in value) {
						const operator = MAP_OPERATORS.find((_oper) => {
							return _oper.name == key
						})
						if (operator) {
							// @ts-expect-error
							if (!MAP_FORMS[operator.type][operator.name]) {
								continue
							}

							// @ts-expect-error
							const val = MAP_FORMS[operator.type][operator.name](
								data,
								value[key]
							)

							data = val
						} else {
							data[key] = value[key]
						}
					}

					localData[coll.name].data[index] = {
						...data,
					}
				}
			}

			return log
		}

		return {
			insertOne,
			create: async (data: any) => {
				const res = await insertOne(data)
				return res
			},
			insertMany,
			drop,
			find: async (filters?: { [nameAttribute: string]: any }) => {
				const res = await find(filters)
				return res
			},
			findOne: async (filters?: { [nameAttribute: string]: any }) => {
				const res = await findOne(filters)
				return res
			},
			updateOne: async (
				filters: { [nameAttribute: string]: any },
				value: { [nameAttribute: string]: any }
			) => {
				const res = await updateOne(filters, value)
				return res
			},
			insertOneSpec: insertOne,
			createSpec: insertOne,
			insertManySpec: insertMany,
			dropSpec: drop,
			findSpec: find,
			findOneSpec: findOne,
			updateOneSpec: updateOne,
		}
	}

	const model = (collectionName: CollectionName) => {
		let coll: Collection | null =
			getCollection(collectionName).collection || null

		if (!coll) {
			coll = { name: collectionName, data: [] }
			localData[collectionName] = coll
		}

		return connectCollection(coll)
	}

	// Model
	const getCollection: (name: CollectionName) => {
		collection?: Collection;
		error?: ErrorGeneral;
	} = (name: CollectionName) => {
		const collection = localData[name]

		if (!collection) {
			return {
				error: new ErrorGeneral({
					title: 'Database Local',
					message: [
						{ message: `Collection "${name}" not found`, origin: 'collection' },
					],
					status: 500,
				}),
			}
		}

		return { collection }
	}

	const removeCollection = (name: CollectionName) => {
		if (!localData[name]) {
			return {
				error: new ErrorGeneral({
					title: 'Database Local',
					message: [
						{ message: `Collection "${name}" not found`, origin: 'collection' },
					],
					status: 500,
				}),
			}
		}

		delete localData[name]

		return true
	}

	const dropDatabase = () => {
		for (const collName in localData) {
			delete localData[collName]
		}
	}

	return {
		localData,
		model,
		dropDatabase,
	}
}

export const localDB = newLocalDB()
