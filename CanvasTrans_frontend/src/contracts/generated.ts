import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CanvasTrans
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const canvasTransAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  { type: 'receive', stateMutability: 'payable' },
  {
    type: 'function',
    inputs: [
      { name: '_transactionId', internalType: 'uint256', type: 'uint256' },
      { name: '_text', internalType: 'string', type: 'string' },
    ],
    name: 'addComment',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_transactionId', internalType: 'uint256', type: 'uint256' },
      { name: '_blockId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'addTransactionToBlock',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'admin',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'blockCounter',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'blocks',
    outputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'description', internalType: 'string', type: 'string' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_name', internalType: 'string', type: 'string' },
      { name: '_description', internalType: 'string', type: 'string' },
    ],
    name: 'createBlock',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_ipfsHash', internalType: 'string', type: 'string' },
      { name: '_title', internalType: 'string', type: 'string' },
      { name: '_description', internalType: 'string', type: 'string' },
    ],
    name: 'createTransaction',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_transactionId', internalType: 'uint256', type: 'uint256' },
      { name: '_commentIndex', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'deleteComment',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_transactionId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'donateToTransaction',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'donations',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_userToFollow', internalType: 'address', type: 'address' },
    ],
    name: 'followUser',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_blockId', internalType: 'uint256', type: 'uint256' }],
    name: 'getBlockDetails',
    outputs: [
      {
        name: '',
        internalType: 'struct CanvasTrans.Block',
        type: 'tuple',
        components: [
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'description', internalType: 'string', type: 'string' },
          { name: 'owner', internalType: 'address', type: 'address' },
          {
            name: 'transactionIds',
            internalType: 'uint256[]',
            type: 'uint256[]',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_transactionId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getDonorsAndDonations',
    outputs: [
      { name: '', internalType: 'address[]', type: 'address[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_user', internalType: 'address', type: 'address' }],
    name: 'getFollowers',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_user', internalType: 'address', type: 'address' }],
    name: 'getFollowing',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPublicTransactions',
    outputs: [
      {
        name: '',
        internalType: 'struct CanvasTrans.CanvasTransItem[]',
        type: 'tuple[]',
        components: [
          { name: 'ipfsHash', internalType: 'string', type: 'string' },
          { name: 'title', internalType: 'string', type: 'string' },
          { name: 'description', internalType: 'string', type: 'string' },
          { name: 'creator', internalType: 'address', type: 'address' },
          { name: 'likes', internalType: 'uint256', type: 'uint256' },
          { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
          { name: 'totalDonations', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_transactionId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getTransactionComments',
    outputs: [
      {
        name: '',
        internalType: 'struct CanvasTrans.Comment[]',
        type: 'tuple[]',
        components: [
          { name: 'commenter', internalType: 'address', type: 'address' },
          { name: 'text', internalType: 'string', type: 'string' },
          { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_user', internalType: 'address', type: 'address' }],
    name: 'getUserBlocks',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_user', internalType: 'address', type: 'address' }],
    name: 'getUserFeed',
    outputs: [
      {
        name: '',
        internalType: 'struct CanvasTrans.CanvasTransItem[]',
        type: 'tuple[]',
        components: [
          { name: 'ipfsHash', internalType: 'string', type: 'string' },
          { name: 'title', internalType: 'string', type: 'string' },
          { name: 'description', internalType: 'string', type: 'string' },
          { name: 'creator', internalType: 'address', type: 'address' },
          { name: 'likes', internalType: 'uint256', type: 'uint256' },
          { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
          { name: 'totalDonations', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_user', internalType: 'address', type: 'address' }],
    name: 'getUserProfile',
    outputs: [
      {
        name: '',
        internalType: 'struct CanvasTrans.UserProfile',
        type: 'tuple',
        components: [
          { name: 'username', internalType: 'string', type: 'string' },
          { name: 'bio', internalType: 'string', type: 'string' },
          { name: 'profilePicture', internalType: 'string', type: 'string' },
          { name: 'followers', internalType: 'address[]', type: 'address[]' },
          { name: 'following', internalType: 'address[]', type: 'address[]' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_user', internalType: 'address', type: 'address' }],
    name: 'getUserTransactions',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_transactionId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'likeTransaction',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transactionComments',
    outputs: [
      { name: 'commenter', internalType: 'address', type: 'address' },
      { name: 'text', internalType: 'string', type: 'string' },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'transactionCounter',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transactionDonors',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'transactionLikes',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'transactions',
    outputs: [
      { name: 'ipfsHash', internalType: 'string', type: 'string' },
      { name: 'title', internalType: 'string', type: 'string' },
      { name: 'description', internalType: 'string', type: 'string' },
      { name: 'creator', internalType: 'address', type: 'address' },
      { name: 'likes', internalType: 'uint256', type: 'uint256' },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
      { name: 'totalDonations', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_newAdmin', internalType: 'address', type: 'address' }],
    name: 'updateAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_blockId', internalType: 'uint256', type: 'uint256' },
      { name: '_newName', internalType: 'string', type: 'string' },
      { name: '_newDescription', internalType: 'string', type: 'string' },
    ],
    name: 'updateBlockDetails',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_username', internalType: 'string', type: 'string' },
      { name: '_bio', internalType: 'string', type: 'string' },
      { name: '_profilePicture', internalType: 'string', type: 'string' },
    ],
    name: 'updateProfile',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'userBlocks',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'userProfiles',
    outputs: [
      { name: 'username', internalType: 'string', type: 'string' },
      { name: 'bio', internalType: 'string', type: 'string' },
      { name: 'profilePicture', internalType: 'string', type: 'string' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'userTransactions',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdrawAdminFunds',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_transactionId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'withdrawDonations',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'blockId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'BlockCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'blockId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'newName',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'newDescription',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'BlockDetailsUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'transactionId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'commenter',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'text', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'CommentAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'transactionId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'donor',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'DonationMade',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'creator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'DonationsWithdrawn',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'follower',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Followed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'username',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      { name: 'bio', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'profilePicture',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'ProfileUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'transactionId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'blockId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'TransactionAddedToBlock',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'transactionId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'creator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'TransactionCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'transactionId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'liker',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'TransactionLiked',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMulticall3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMulticall3Abi = [
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'returnData', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3Value[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3Value',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'blockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBasefee',
    outputs: [{ name: 'basefee', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'blockNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'getBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBlockNumber',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getChainId',
    outputs: [{ name: 'chainid', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockCoinbase',
    outputs: [{ name: 'coinbase', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockDifficulty',
    outputs: [{ name: 'difficulty', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockGasLimit',
    outputs: [{ name: 'gaslimit', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockTimestamp',
    outputs: [{ name: 'timestamp', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'getEthBalance',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLastBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryAggregate',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryBlockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link canvasTransAbi}__
 */
export const useReadCanvasTransundefined = /*#__PURE__*/ createUseReadContract({
  abi: canvasTransAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"admin"`
 */
export const useReadCanvasTransAdmin = /*#__PURE__*/ createUseReadContract({
  abi: canvasTransAbi,
  functionName: 'admin',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"blockCounter"`
 */
export const useReadCanvasTransBlockCounter =
  /*#__PURE__*/ createUseReadContract({
    abi: canvasTransAbi,
    functionName: 'blockCounter',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"blocks"`
 */
export const useReadCanvasTransBlocks = /*#__PURE__*/ createUseReadContract({
  abi: canvasTransAbi,
  functionName: 'blocks',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"donations"`
 */
export const useReadCanvasTransDonations = /*#__PURE__*/ createUseReadContract({
  abi: canvasTransAbi,
  functionName: 'donations',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"getBlockDetails"`
 */
export const useReadCanvasTransGetBlockDetails =
  /*#__PURE__*/ createUseReadContract({
    abi: canvasTransAbi,
    functionName: 'getBlockDetails',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"getDonorsAndDonations"`
 */
export const useReadCanvasTransGetDonorsAndDonations =
  /*#__PURE__*/ createUseReadContract({
    abi: canvasTransAbi,
    functionName: 'getDonorsAndDonations',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"getFollowers"`
 */
export const useReadCanvasTransGetFollowers =
  /*#__PURE__*/ createUseReadContract({
    abi: canvasTransAbi,
    functionName: 'getFollowers',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"getFollowing"`
 */
export const useReadCanvasTransGetFollowing =
  /*#__PURE__*/ createUseReadContract({
    abi: canvasTransAbi,
    functionName: 'getFollowing',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"getPublicTransactions"`
 */
export const useReadCanvasTransGetPublicTransactions =
  /*#__PURE__*/ createUseReadContract({
    abi: canvasTransAbi,
    functionName: 'getPublicTransactions',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"getTransactionComments"`
 */
export const useReadCanvasTransGetTransactionComments =
  /*#__PURE__*/ createUseReadContract({
    abi: canvasTransAbi,
    functionName: 'getTransactionComments',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"getUserBlocks"`
 */
export const useReadCanvasTransGetUserBlocks =
  /*#__PURE__*/ createUseReadContract({
    abi: canvasTransAbi,
    functionName: 'getUserBlocks',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"getUserFeed"`
 */
export const useReadCanvasTransGetUserFeed =
  /*#__PURE__*/ createUseReadContract({
    abi: canvasTransAbi,
    functionName: 'getUserFeed',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"getUserProfile"`
 */
export const useReadCanvasTransGetUserProfile =
  /*#__PURE__*/ createUseReadContract({
    abi: canvasTransAbi,
    functionName: 'getUserProfile',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"getUserTransactions"`
 */
export const useReadCanvasTransGetUserTransactions =
  /*#__PURE__*/ createUseReadContract({
    abi: canvasTransAbi,
    functionName: 'getUserTransactions',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"transactionComments"`
 */
export const useReadCanvasTransTransactionComments =
  /*#__PURE__*/ createUseReadContract({
    abi: canvasTransAbi,
    functionName: 'transactionComments',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"transactionCounter"`
 */
export const useReadCanvasTransTransactionCounter =
  /*#__PURE__*/ createUseReadContract({
    abi: canvasTransAbi,
    functionName: 'transactionCounter',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"transactionDonors"`
 */
export const useReadCanvasTransTransactionDonors =
  /*#__PURE__*/ createUseReadContract({
    abi: canvasTransAbi,
    functionName: 'transactionDonors',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"transactionLikes"`
 */
export const useReadCanvasTransTransactionLikes =
  /*#__PURE__*/ createUseReadContract({
    abi: canvasTransAbi,
    functionName: 'transactionLikes',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"transactions"`
 */
export const useReadCanvasTransTransactions =
  /*#__PURE__*/ createUseReadContract({
    abi: canvasTransAbi,
    functionName: 'transactions',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"userBlocks"`
 */
export const useReadCanvasTransUserBlocks = /*#__PURE__*/ createUseReadContract(
  { abi: canvasTransAbi, functionName: 'userBlocks' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"userProfiles"`
 */
export const useReadCanvasTransUserProfiles =
  /*#__PURE__*/ createUseReadContract({
    abi: canvasTransAbi,
    functionName: 'userProfiles',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"userTransactions"`
 */
export const useReadCanvasTransUserTransactions =
  /*#__PURE__*/ createUseReadContract({
    abi: canvasTransAbi,
    functionName: 'userTransactions',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link canvasTransAbi}__
 */
export const useWriteCanvasTransundefined =
  /*#__PURE__*/ createUseWriteContract({ abi: canvasTransAbi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"addComment"`
 */
export const useWriteCanvasTransAddComment =
  /*#__PURE__*/ createUseWriteContract({
    abi: canvasTransAbi,
    functionName: 'addComment',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"addTransactionToBlock"`
 */
export const useWriteCanvasTransAddTransactionToBlock =
  /*#__PURE__*/ createUseWriteContract({
    abi: canvasTransAbi,
    functionName: 'addTransactionToBlock',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"createBlock"`
 */
export const useWriteCanvasTransCreateBlock =
  /*#__PURE__*/ createUseWriteContract({
    abi: canvasTransAbi,
    functionName: 'createBlock',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"createTransaction"`
 */
export const useWriteCanvasTransCreateTransaction =
  /*#__PURE__*/ createUseWriteContract({
    abi: canvasTransAbi,
    functionName: 'createTransaction',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"deleteComment"`
 */
export const useWriteCanvasTransDeleteComment =
  /*#__PURE__*/ createUseWriteContract({
    abi: canvasTransAbi,
    functionName: 'deleteComment',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"donateToTransaction"`
 */
export const useWriteCanvasTransDonateToTransaction =
  /*#__PURE__*/ createUseWriteContract({
    abi: canvasTransAbi,
    functionName: 'donateToTransaction',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"followUser"`
 */
export const useWriteCanvasTransFollowUser =
  /*#__PURE__*/ createUseWriteContract({
    abi: canvasTransAbi,
    functionName: 'followUser',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"likeTransaction"`
 */
export const useWriteCanvasTransLikeTransaction =
  /*#__PURE__*/ createUseWriteContract({
    abi: canvasTransAbi,
    functionName: 'likeTransaction',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"updateAdmin"`
 */
export const useWriteCanvasTransUpdateAdmin =
  /*#__PURE__*/ createUseWriteContract({
    abi: canvasTransAbi,
    functionName: 'updateAdmin',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"updateBlockDetails"`
 */
export const useWriteCanvasTransUpdateBlockDetails =
  /*#__PURE__*/ createUseWriteContract({
    abi: canvasTransAbi,
    functionName: 'updateBlockDetails',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"updateProfile"`
 */
export const useWriteCanvasTransUpdateProfile =
  /*#__PURE__*/ createUseWriteContract({
    abi: canvasTransAbi,
    functionName: 'updateProfile',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"withdrawAdminFunds"`
 */
export const useWriteCanvasTransWithdrawAdminFunds =
  /*#__PURE__*/ createUseWriteContract({
    abi: canvasTransAbi,
    functionName: 'withdrawAdminFunds',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"withdrawDonations"`
 */
export const useWriteCanvasTransWithdrawDonations =
  /*#__PURE__*/ createUseWriteContract({
    abi: canvasTransAbi,
    functionName: 'withdrawDonations',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link canvasTransAbi}__
 */
export const useSimulateCanvasTransundefined =
  /*#__PURE__*/ createUseSimulateContract({ abi: canvasTransAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"addComment"`
 */
export const useSimulateCanvasTransAddComment =
  /*#__PURE__*/ createUseSimulateContract({
    abi: canvasTransAbi,
    functionName: 'addComment',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"addTransactionToBlock"`
 */
export const useSimulateCanvasTransAddTransactionToBlock =
  /*#__PURE__*/ createUseSimulateContract({
    abi: canvasTransAbi,
    functionName: 'addTransactionToBlock',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"createBlock"`
 */
export const useSimulateCanvasTransCreateBlock =
  /*#__PURE__*/ createUseSimulateContract({
    abi: canvasTransAbi,
    functionName: 'createBlock',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"createTransaction"`
 */
export const useSimulateCanvasTransCreateTransaction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: canvasTransAbi,
    functionName: 'createTransaction',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"deleteComment"`
 */
export const useSimulateCanvasTransDeleteComment =
  /*#__PURE__*/ createUseSimulateContract({
    abi: canvasTransAbi,
    functionName: 'deleteComment',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"donateToTransaction"`
 */
export const useSimulateCanvasTransDonateToTransaction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: canvasTransAbi,
    functionName: 'donateToTransaction',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"followUser"`
 */
export const useSimulateCanvasTransFollowUser =
  /*#__PURE__*/ createUseSimulateContract({
    abi: canvasTransAbi,
    functionName: 'followUser',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"likeTransaction"`
 */
export const useSimulateCanvasTransLikeTransaction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: canvasTransAbi,
    functionName: 'likeTransaction',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"updateAdmin"`
 */
export const useSimulateCanvasTransUpdateAdmin =
  /*#__PURE__*/ createUseSimulateContract({
    abi: canvasTransAbi,
    functionName: 'updateAdmin',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"updateBlockDetails"`
 */
export const useSimulateCanvasTransUpdateBlockDetails =
  /*#__PURE__*/ createUseSimulateContract({
    abi: canvasTransAbi,
    functionName: 'updateBlockDetails',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"updateProfile"`
 */
export const useSimulateCanvasTransUpdateProfile =
  /*#__PURE__*/ createUseSimulateContract({
    abi: canvasTransAbi,
    functionName: 'updateProfile',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"withdrawAdminFunds"`
 */
export const useSimulateCanvasTransWithdrawAdminFunds =
  /*#__PURE__*/ createUseSimulateContract({
    abi: canvasTransAbi,
    functionName: 'withdrawAdminFunds',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link canvasTransAbi}__ and `functionName` set to `"withdrawDonations"`
 */
export const useSimulateCanvasTransWithdrawDonations =
  /*#__PURE__*/ createUseSimulateContract({
    abi: canvasTransAbi,
    functionName: 'withdrawDonations',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link canvasTransAbi}__
 */
export const useWatchCanvasTransundefined =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: canvasTransAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link canvasTransAbi}__ and `eventName` set to `"BlockCreated"`
 */
export const useWatchCanvasTransBlockCreated =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: canvasTransAbi,
    eventName: 'BlockCreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link canvasTransAbi}__ and `eventName` set to `"BlockDetailsUpdated"`
 */
export const useWatchCanvasTransBlockDetailsUpdated =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: canvasTransAbi,
    eventName: 'BlockDetailsUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link canvasTransAbi}__ and `eventName` set to `"CommentAdded"`
 */
export const useWatchCanvasTransCommentAdded =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: canvasTransAbi,
    eventName: 'CommentAdded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link canvasTransAbi}__ and `eventName` set to `"DonationMade"`
 */
export const useWatchCanvasTransDonationMade =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: canvasTransAbi,
    eventName: 'DonationMade',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link canvasTransAbi}__ and `eventName` set to `"DonationsWithdrawn"`
 */
export const useWatchCanvasTransDonationsWithdrawn =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: canvasTransAbi,
    eventName: 'DonationsWithdrawn',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link canvasTransAbi}__ and `eventName` set to `"Followed"`
 */
export const useWatchCanvasTransFollowed =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: canvasTransAbi,
    eventName: 'Followed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link canvasTransAbi}__ and `eventName` set to `"ProfileUpdated"`
 */
export const useWatchCanvasTransProfileUpdated =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: canvasTransAbi,
    eventName: 'ProfileUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link canvasTransAbi}__ and `eventName` set to `"TransactionAddedToBlock"`
 */
export const useWatchCanvasTransTransactionAddedToBlock =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: canvasTransAbi,
    eventName: 'TransactionAddedToBlock',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link canvasTransAbi}__ and `eventName` set to `"TransactionCreated"`
 */
export const useWatchCanvasTransTransactionCreated =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: canvasTransAbi,
    eventName: 'TransactionCreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link canvasTransAbi}__ and `eventName` set to `"TransactionLiked"`
 */
export const useWatchCanvasTransTransactionLiked =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: canvasTransAbi,
    eventName: 'TransactionLiked',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const useReadIMulticall3undefined = /*#__PURE__*/ createUseReadContract({
  abi: iMulticall3Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBasefee"`
 */
export const useReadIMulticall3GetBasefee = /*#__PURE__*/ createUseReadContract(
  { abi: iMulticall3Abi, functionName: 'getBasefee' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBlockHash"`
 */
export const useReadIMulticall3GetBlockHash =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getBlockHash',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBlockNumber"`
 */
export const useReadIMulticall3GetBlockNumber =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getBlockNumber',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getChainId"`
 */
export const useReadIMulticall3GetChainId = /*#__PURE__*/ createUseReadContract(
  { abi: iMulticall3Abi, functionName: 'getChainId' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockCoinbase"`
 */
export const useReadIMulticall3GetCurrentBlockCoinbase =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockCoinbase',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockDifficulty"`
 */
export const useReadIMulticall3GetCurrentBlockDifficulty =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockDifficulty',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockGasLimit"`
 */
export const useReadIMulticall3GetCurrentBlockGasLimit =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockGasLimit',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockTimestamp"`
 */
export const useReadIMulticall3GetCurrentBlockTimestamp =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockTimestamp',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getEthBalance"`
 */
export const useReadIMulticall3GetEthBalance =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getEthBalance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getLastBlockHash"`
 */
export const useReadIMulticall3GetLastBlockHash =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getLastBlockHash',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const useWriteIMulticall3undefined =
  /*#__PURE__*/ createUseWriteContract({ abi: iMulticall3Abi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate"`
 */
export const useWriteIMulticall3Aggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3"`
 */
export const useWriteIMulticall3Aggregate3 =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3Value"`
 */
export const useWriteIMulticall3Aggregate3Value =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3Value',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"blockAndAggregate"`
 */
export const useWriteIMulticall3BlockAndAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'blockAndAggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryAggregate"`
 */
export const useWriteIMulticall3TryAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'tryAggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryBlockAndAggregate"`
 */
export const useWriteIMulticall3TryBlockAndAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'tryBlockAndAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const useSimulateIMulticall3undefined =
  /*#__PURE__*/ createUseSimulateContract({ abi: iMulticall3Abi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate"`
 */
export const useSimulateIMulticall3Aggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3"`
 */
export const useSimulateIMulticall3Aggregate3 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3Value"`
 */
export const useSimulateIMulticall3Aggregate3Value =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3Value',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"blockAndAggregate"`
 */
export const useSimulateIMulticall3BlockAndAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'blockAndAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryAggregate"`
 */
export const useSimulateIMulticall3TryAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'tryAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryBlockAndAggregate"`
 */
export const useSimulateIMulticall3TryBlockAndAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'tryBlockAndAggregate',
  })
